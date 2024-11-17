import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


export async function GET() {
  const prisma = new PrismaClient();

  try {
    const gpus = await prisma.gpu.findMany();

    return NextResponse.json(gpus, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}