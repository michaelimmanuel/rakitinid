import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage'; // Import Upload utility from AWS SDK
import fs from 'fs'; // for file handling
import path from 'path';

import s3 from '@/lib/s3';
type Slug = 'casing' | 'processor' | 'gpu' | 'motherboard' | 'psu' | 'ram' | 'storage' | 'fan' | 'accessories' | 'cooler';

const prisma = new PrismaClient();


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
};

export async function PUT(req: Request, { params }: { params: { slug: Slug; id: string } }) {
  const { slug, id } = params;

  if (!slug || !id) {
    return NextResponse.json({ error: 'Missing slug or id in the request' }, { status: 400 });
  }

  const db = modelMap[slug];
  try {
    // Parse the form data (body and file)
    const formData = await req.formData();
    const fields: Record<string, any> = {};
    let imageUrl: string | undefined;

    for (const [key, value] of formData.entries()) {
      if (key === 'image' && value instanceof File) {
        const ext = value.name.split('.').pop();
        const fileName = `${slug}-${id}.${ext}`;
        
        // Upload image to S3
        try {
          const upload = new Upload({
            client: s3,
            params: {
              Bucket: process.env.DO_SPACES_BUCKET!,
              Key: fileName,
              Body: value.stream(),
              ContentType: value.type,
              ACL: 'public-read',
            },
          });
        
          await upload.done(); // DigitalOcean Spaces doesn't return `Location`
        
 
          imageUrl = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${fileName}`;
          fields.image = imageUrl; // Save this URL in the database
        } catch (uploadError) {
          console.error('Error during file upload:', uploadError);
          return NextResponse.json({ error: 'Error uploading file to S3' }, { status: 500 });
        }
      } else {
        fields[key] = value;
      }
    }



    // Convert price if it's a string
    if (fields.price && typeof fields.price === 'string') {
      fields.price = parseFloat(fields.price);
    }

    if (fields.quantity && typeof fields.quantity === 'string') {
      fields.quantity = parseFloat(fields.quantity);
    }

    if (fields.socket_type_id && typeof fields.socket_type_id === 'string') {
      fields.socket_type_id = parseInt(fields.socket_type_id, 10);
    }
    
    // Handle foreign key properly
    if (fields.socket_type_id) {
      fields.socket_type = { connect: { id: fields.socket_type_id } };
      delete fields.socket_type_id; // Prisma does not accept direct foreign key updates
    }
    

    
    const updatedData = await db.update({
      where: { id: parseInt(id) },
      data: fields,
    });
    
    

    // Remove id to avoid overwriting it
    delete fields.id;



    return NextResponse.json({ message: 'Updated successfully', updated: updatedData }, { status: 200 });
  } catch (error: any) {
    console.error('Error in PUT handler:', error);
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


// Helper function to delete a file from S3
const deleteFromS3 = async (fileName: string) => {
  const bucket = process.env.DO_SPACES_BUCKET;

  if (!bucket) {
    console.error("❌ Error: DO_SPACES_BUCKET is not defined");
    return;
  }

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: fileName,
  });

  try {
    await s3.send(command);
    console.log(`✅ File deleted from S3: ${fileName}`);
  } catch (error: any) {
    console.error("❌ Error deleting from S3:", error.message);
  }
};


// GET handler: Fetch data by slug and ID
export async function GET(req: Request, { params }: { params: { slug: Slug; id: number } }) {
  const { slug, id } = params;

  const db = modelMap[slug];
  try {
    const record = await db.findFirst({
      where: { id },
    });

    return NextResponse.json(record, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


// DELETE handler: Delete data and associated file from S3
export async function DELETE(req: Request, { params }: { params: { slug: Slug; id: string } }) {
  const { slug, id } = params;

  const db = modelMap[slug];

  try {
    const record = await db.findFirst({
      where: { id: parseInt(id) },
    });

    if (!record) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    if (record.image) {
      // Delete the file from S3
      const fileName = record.image.split('/').pop();
      if (fileName) {
        await deleteFromS3( fileName); // Adjust with your bucket name
      }
    }

    const deletedRecord = await db.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Deleted successfully', deleted: deletedRecord }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
