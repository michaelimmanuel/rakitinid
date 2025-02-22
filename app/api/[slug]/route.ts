import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '@/lib/s3'; // Import the S3 client
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

type Slug = 'casing' | 'processor' | 'gpu' | 'motherboard' | 'psu' | 'ram' | 'storage' | 'fan' | 'accessories' | 'cooler' | 'socket_types' | 'monitor';

const modelMap: Record<Slug, any> = {
  casing: prisma.casing,
  processor: prisma.processor,
  gpu: prisma.gpu,
  motherboard: prisma.motherboard,
  psu: prisma.psu,
  ram: prisma.ram,
  storage: prisma.storage,
  fan: prisma.fan,
  accessories: prisma.accessories,
  cooler: prisma.cooler,
  socket_types: prisma.socket_type,
  monitor: prisma.monitor,
};

export async function POST(req: Request, { params }: { params: { slug: Slug } }) {
  const { slug } = params;
  const db = modelMap[slug];

  if (!db) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const fields: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      if (key === 'image' && value instanceof File) {
        const ext = value.name.split('.').pop();
        const fileName = `${slug}-${randomUUID()}.${ext}`;

        // Convert ArrayBuffer to Buffer (Fixes the error)
        const arrayBuffer = await value.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to DigitalOcean Spaces (S3)
        const uploadParams = {
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: fileName,
          Body: buffer, // Fix: Using Buffer
          ContentType: value.type,
          ACL: 'public-read' as ObjectCannedACL,
        };

        await s3.send(new PutObjectCommand(uploadParams));

        // Store the file URL in the database
        fields.image = `https://${process.env.S3_BUCKET_NAME}.${process.env.S3_ENDPOINT}/${fileName}`;
      } else {
        fields[key] = value;
      }
    }

    // Convert numeric fields if necessary
    if (fields.price && typeof fields.price === 'string') {
      fields.price = parseFloat(fields.price);
    }
    if (fields.socket_type_id && typeof fields.socket_type_id === 'string') {
      fields.socket_type_id = parseInt(fields.socket_type_id, 10);
    }
    if (fields.quantity && typeof fields.quantity === 'string') {
      fields.quantity = parseInt(fields.quantity, 10);
    }

    // Create a new entry in the database
    const newEntry = await db.create({
      data: fields,
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


export async function GET(req: Request, { params }: { params: { slug: Slug } }) {
  const { slug } = params;
  const db = modelMap[slug];

  if (!db) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  let orderBy;

  switch (slug) {
    case "processor":
      orderBy = { name: "asc" };
      break;
    case "psu":
      orderBy = { wattage: "asc" };
      break;
    
    case "storage":
      // Use MySQL's SIGNED cast to sort string as numbers
      try {
        const data = await prisma.$queryRawUnsafe(`
          SELECT * FROM ${slug} 
          ORDER BY CAST(capacity AS SIGNED) ASC
        `);
        return NextResponse.json(data, { status: 200 });
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      } finally {
        await prisma.$disconnect();
      }
    default:
      orderBy = { price: "asc" };
      break;
  }

  try {
    const data = await db.findMany({ orderBy });
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

