import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


export async function GET(req: Request, { params }: { params: { type: string } }) {
  const prisma = new PrismaClient();
  const { type } = params;
 
  try {
    const ram = await prisma.ram.findMany({
      where: {
         memory_type: type.replace(/\s/g, "")
      },
    });

    return NextResponse.json(ram, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
