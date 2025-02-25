import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '@/lib/s3'; // Import the S3 client
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const processors = await prisma.processor.findMany({
      include: {
        socket_type: true,
      },
      orderBy: [{ name: 'asc' }],
    });

    // Format the response to include socket type name
    const processedData = processors.map((processor) => ({
      ...processor,
      socket_type: processor.socket_type.name, // Replace socket_type_id with its name
    }));

    return NextResponse.json(processedData, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching processors:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fields: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      if (key === 'image' && value instanceof File) {
        const ext = value.name.split('.').pop();
        const fileName = `processor-${randomUUID()}.${ext}`;

        // Convert File to Buffer
        const arrayBuffer = await value.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to DigitalOcean Spaces (S3)
        const uploadParams = {
          Bucket: process.env.DO_SPACES_BUCKET!,
          Key: fileName,
          Body: buffer,
          ContentType: value.type,
          ACL: 'public-read' as ObjectCannedACL,
        };

        await s3.send(new PutObjectCommand(uploadParams));

        // Store file URL in the database
        fields.image = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${fileName}`;
      } else {
        fields[key] = value;
      }
    }

    // Convert fields to proper types
    if (fields.price) fields.price = parseFloat(fields.price);
    if (fields.socket_type_id) fields.socket_type_id = parseInt(fields.socket_type_id, 10);
    if (fields.quantity) fields.quantity = parseInt(fields.quantity, 10);

    // Validate that socket_type_id exists
    const socketTypeExists = await prisma.socket_type.findUnique({
      where: { id: fields.socket_type_id },
    });

    if (!socketTypeExists) {
      return NextResponse.json({ error: 'Invalid socket_type_id' }, { status: 400 });
    }

    // Create a new processor entry
    const newProcessor = await prisma.processor.create({
      data: {
        name: fields.name,
        brand: fields.brand, // Add the brand property
        price: fields.price,
        quantity: fields.quantity,
        image: fields.image,
        socket_type: {
          connect: { id: fields.socket_type_id }, // Connect the processor to socket_type
        },
      },
      include: {
        socket_type: true, // Return socket type data
      },
    });

    return NextResponse.json(newProcessor, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
