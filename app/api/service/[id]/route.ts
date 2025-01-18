import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: any) {
  const { id } = req.query;
  const service = await prisma.service.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(service);
}

export async function GET(req: any,  { params }: { params: { id: string }}) {

    const { id } = params;
    
    const service = await prisma.service.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    
    return NextResponse.json(service);
}

