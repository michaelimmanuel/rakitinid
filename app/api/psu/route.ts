import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


export async function GET() {
  const prisma = new PrismaClient();

  try {
    const psus = await prisma.psu.findMany();

    return NextResponse.json(psus, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}