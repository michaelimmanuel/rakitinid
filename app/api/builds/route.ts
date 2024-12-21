import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();



export async function POST(req: Request) {

    try{

        // get the data from the request
        const body = await req.json();

        // create a new build
        const build = await prisma.build.create({
            data: {
                motherboard: body.motherboard,
                processor: body.processor,
                ram: body.ram,
                gpu: body.gpu,
                storage: body.storage,
                psu: body.psu,
                casing: body.casing,
                motherboardPrice: body.motherboardPrice,
                processorPrice: body.processorPrice,
                ramPrice: body.ramPrice,
                gpuPrice: body.gpuPrice,
                storagePrice: body.storagePrice,
                psuPrice: body.psuPrice,
                casingPrice: body.casingPrice,
                totalPrice: body.totalPrice,
                fan1: body.fan1,
                fan2: body.fan2,
                fan3: body.fan3,
                fan4: body.fan4
            }
        });

        return NextResponse.json({"id":"RKTN-" + build.id}, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const builds = await prisma.build.findMany(
            {select: {id: true, status: true, totalPrice: true, createdAt: true}}
        );
        return NextResponse.json(builds, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}