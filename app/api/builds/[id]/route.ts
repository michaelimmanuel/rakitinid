import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try{
        const motherboards = await prisma.build.findFirst({
            where: {
                id: parseInt(id)
            }
        });

        return NextResponse.json(motherboards, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const data = await req.json();

    try{
        const updatedBuild = await prisma.build.update({
            where: {
                id: parseInt(id)
            },
            data: {
                ...data
            }
        });

        return NextResponse.json(updatedBuild, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const data = await req.json();

    try{
        const updatedBuild = await prisma.build.update({
            where: {
                id: parseInt(id)
            },
            data: {
                ...data
            }
        });

        return NextResponse.json(updatedBuild, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try{
        const deletedBuild = await prisma.build.delete({
            where: {
                id: parseInt(id)
            }
        });

        return NextResponse.json(deletedBuild, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}