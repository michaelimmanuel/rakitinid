import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


export async function GET(req: Request, { params }: { params: { brand: string } }) {
  const prisma = new PrismaClient();
  const { brand } = params;
  const allowedBrands = ['intel', 'amd'];
  if (!allowedBrands.includes(brand.toLowerCase())) {
    return NextResponse.json({ error: 'Invalid brand. Use intel or amd.' }, { status: 400 });
  }

  try {
    const processors = await prisma.processor.findMany({
      where: {
        brand,
      },
    });

    return NextResponse.json(processors, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}