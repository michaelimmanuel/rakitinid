import { PrismaClient } from '@prisma/client';
import s3 from '@/lib/s3';
import { Upload } from "@aws-sdk/lib-storage"; 
import { DeleteObjectCommand } from '@aws-sdk/client-s3'; // Import DeleteObjectCommand

import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function del(filename: string) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: 'rakitin-space', // your S3 bucket name
      Key: filename, // the filename or path you want to delete
    });

    await s3.send(command); // send the delete command to S3
  } catch (error) {
    console.error("Error deleting object from S3:", error);
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    
    // get data from form
    const formData = await req.formData();
    const fields: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {

        if (key === 'image' && value instanceof File) {
            const ext = value.name.split('.').pop();
            const fileName = `prebuilt-${id}.${ext}`;
            
            // Upload file to s3
            const upload = new Upload({
                client: s3,
                params: {
                    Bucket: 'rakitin-space',
                    Key: fileName,
                    Body: value.stream(),
                    ContentType: value.type,
                    ACL: 'public-read',
                },
            });
            
            fields.image = (await upload.done()).Location; // Save S3 URL in database
        } else if (key === 'coverImage' && value instanceof File) {
            const ext = value.name.split('.').pop();
            const fileName = `prebuilt-cover-${id}.${ext}`;
            
            // Upload file to s3 for cover image
            const upload = new Upload({
                client: s3,
                params: {
                    Bucket: 'rakitin-space',
                    Key: fileName,
                    Body: value.stream(),
                    ContentType: value.type,
                    ACL: 'public-read',
                },
            });

            fields.coverImage = (await upload.done()).Location; // Save S3 URL for cover image in database
        } else {
            fields[key] = value;
        }
    }

    fields.price = parseFloat(fields.price);
    fields.discountPrice = fields.discountPrice === "" ? 0 : parseInt(fields.discountPrice);
    fields.quantity = fields.quantity === "" ? 0 : parseInt(fields.quantity);

    // delete the old image
    const oldPrebuilt = await prisma.prebuilt.findUnique({
        where: {id : parseInt(id)},
    });

    if (oldPrebuilt?.image) {
        const image = oldPrebuilt.image.split('/').pop();
        await del(image!); // Delete old image from S3
    }

    if (oldPrebuilt?.coverImage) {
        const coverImage = oldPrebuilt.coverImage.split('/').pop();
        await del(coverImage!); // Delete old cover image from S3
    }

    // Update the record in the database
    const prebuilt = await prisma.prebuilt.update({
        where: { id: parseInt(id) },
        data: fields,
    });

    return NextResponse.json(prebuilt, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  
  const prebuilt = await prisma.prebuilt.findUnique({
    where: { id: parseInt(id) },
  });

  if (!prebuilt) {
    return NextResponse.json({ error: 'Prebuilt not found' }, { status: 404 });
  }

  if (prebuilt.image) {
    const image = prebuilt.image.split('/').pop();
    await del(image!); // Delete image from S3
  }

  if (prebuilt.coverImage) {
    const coverImage = prebuilt.coverImage.split('/').pop();
    await del(coverImage!); // Delete cover image from S3
  }
  await prisma.prebuilt.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  
  const prebuilt = await prisma.prebuilt.findUnique({
    where: { id: parseInt(id) },
  });
  return NextResponse.json(prebuilt, { status: 200 });
}
