import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { put } from '@vercel/blob';

const prisma = new PrismaClient();

const modelMap: Record<Slug, any> = {
  casing: prisma.casing,
  processor: prisma.processor,
  gpu: prisma.gpu,
  motherboard: prisma.motherboard,
  psu: prisma.psu,
  ram: prisma.ram,
  storage: prisma.storage,
};

type Slug = 'casing' | 'processor' | 'gpu' | 'motherboard' | 'psu' | 'ram' | 'storage';


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
        const fileName = `${slug}-${Date.now()}.${ext}`;

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

    // Convert numeric fields if necessary
    if (fields.price && typeof fields.price === 'string') {
      fields.price = parseFloat(fields.price);
    }
    if (fields.socket_type_id && typeof fields.socket_type_id === 'string') {
      fields.socket_type_id = parseInt(fields.socket_type_id, 10);
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

export async function GET(req: Request , { params }: { params: { slug: Slug } }) {
  const { slug } = params;

  const db = modelMap[slug];

  if (!db) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }

  try {
    const casings = await db.findMany();
    return NextResponse.json(casings, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

