import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req : Request, res:NextResponse){
    const body = await req.json();
    const { name, price } = body;

    try {
        const newModal = await prisma.service.create({
            data: {
                name,
                price
            }
        });

        return NextResponse.json(newModal, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}