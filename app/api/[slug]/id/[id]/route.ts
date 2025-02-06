import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

type Slug = 'casing' | 'processor' | 'gpu' | 'motherboard' | 'psu' | 'ram' | 'storage' | 'fan' | 'accessories'| 'cooler';

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

// PUT handler: Update data and handle file upload with Vercel Blob
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
    for (const [key, value] of formData.entries()) {
      if (key === 'image' && value instanceof File) {
        const ext = value.name.split('.').pop();
        const fileName = `${slug}-${id}.${ext}`;
        
        // Upload file to Vercel Blob
        const blobResult = await put(fileName, await value.arrayBuffer(), {
          contentType: value.type,
          access: 'public', 
        });
        fields.image = blobResult.url; // Save Blob URL in database
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

    

    // Remove id to avoid overwriting it
    delete fields.id;

    // Update the database record
    const updatedData = await db.update({
      where: { id: parseInt(id) },
      data: fields,
    });

    return NextResponse.json({ message: 'Updated successfully', updated: updatedData }, { status: 200 });
  } catch (error: any) {
    console.error('Error in PUT handler:', error);
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE handler: Delete data and associated Blob
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
      // Delete the file on Vercel Blob (optional, requires setup for delete endpoint)
      console.log(`File to delete: ${record.image}`);
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
