import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const modelMap: Record<Slug, any> = {
  casing: prisma.casing_purchase_price,
  processor: prisma.processor_purchase_price,
  gpu: prisma.gpu_purchase_price,
  motherboard: prisma.motherboard_purchase_price,
  psu: prisma.psu_purchase_price,
  ram: prisma.ram_purchase_price,
  storage: prisma.storage_purchase_price,
  fan : prisma.fan_purchase_price,
  accessories: prisma.accessories_purchase_price,
};

type Slug = 'casing' | 'processor' | 'gpu' | 'motherboard' | 'psu' | 'ram' | 'storage' | 'fan' | 'accessories';


export async function POST(req: Request, { params }: { params: { slug: Slug } }) {
  
  
  const { slug } = params;

  const db = modelMap[slug];
  if (!db) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }

  try {
    const newEntry = await db.create({
      data: await req.json(),
    });
    return NextResponse.json(newEntry, { status: 201 });


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request , { params }: { params: { slug: Slug, id : string } }) {
  const { slug } = params;

  const db = modelMap[slug];

  if (!db) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }

  try {
    // get data where slug_id
    const casings = await db.findMany({
      where: {
        [`${slug}_id`]: parseInt(params.id)
      }
    });
    return NextResponse.json(casings, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request , { params }: { params: { slug: Slug, id : string } }) {
  const { slug } = params;

  const db = modelMap[slug];

  if (!db) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }

  try {
    // get data where slug_id
    const casings = await db.delete({
      where: {
        id: parseInt(params.id)
      }
    });
    return NextResponse.json(casings, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: Request , { params }: { params: { slug: Slug, id : string } }) {
  const { slug } = params;

  const db = modelMap[slug];

  if (!db) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }


  const data = await req.json();

  // parse price and quantity to number

  data.price = parseFloat(data.price);
  data.quantity = parseInt(data.quantity);


  try {
    // get data where slug_id
    const casings = await db.update({
      where: {
        id: parseInt(params.id)
      },
      data: data
    });
    return NextResponse.json(casings, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

