import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request ) {

  try {
    const processors = await prisma.processor.findMany({
      
        include : {
            socket_type: true,
        },
        // sort by name
        orderBy: [{
            name: 'asc',
          }
        ],
    });
    const processedData = processors.map((processor) => ({
        ...processor,
        socket_type: processor.socket_type.name, // Replace ID with name
      }));
    return NextResponse.json(processedData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}