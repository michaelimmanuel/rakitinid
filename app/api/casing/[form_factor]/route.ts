import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// get casing by form factor

export async function GET(req: Request, { params }: { params: { form_factor: string } }) {
  const prisma = new PrismaClient();
  const { form_factor } = params;
 
  try {
    const casings = await prisma.casing.findMany({
      where: {
         form_factor: form_factor.replace(/\s/g, "")
      },
    });

    return NextResponse.json(casings, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}