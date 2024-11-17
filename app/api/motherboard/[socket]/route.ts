import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { socket: string } }) {
    const { socket } = params;
    
    try{
        const motherboards = await prisma.motherboard.findMany({
            where: {
                socket_type: {
                    id: parseInt(socket)
                }
            }
        });

        return NextResponse.json(motherboards, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
