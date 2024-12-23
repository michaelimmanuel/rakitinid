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
                fan4: body.fan4,
                fan1Price: body.fan1Price || 0,
                fan2Price: body.fan2Price || 0,
                fan3Price: body.fan3Price || 0,
                fan4Price: body.fan4Price || 0,
                accessories1: body.accessories1,
                accessories2: body.accessories2,
                accessories3: body.accessories3,
                accessories4: body.accessories4,
                accessories1Price: body.accessories1Price || 0,
                accessories2Price: body.accessories2Price || 0,
                accessories3Price: body.accessories3Price || 0,
                accessories4Price: body.accessories4Price || 0,
                cooler: body.cooler,
                coolerPrice: body.coolerPrice || 0,
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