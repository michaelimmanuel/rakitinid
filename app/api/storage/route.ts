import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


export async function GET() {
  const prisma = new PrismaClient();

  try {
    const storage = await prisma.storage.findMany();

    return NextResponse.json(storage, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}