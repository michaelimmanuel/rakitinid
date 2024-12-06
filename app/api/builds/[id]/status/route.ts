import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { parse } from 'path';

const prisma = new PrismaClient();


// get id from the link

export async function PUT(req: Request ,{ params }: { params: { id: string }}) {

    const { id } = params;

    console.log(id)


    try{

        // get the data from the request
        const body = await req.json();

        // update the build
        const build = await prisma.build.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status: body.status
            }
        });

        return NextResponse.json(build, { status: 200 });

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ id: id }, { status: 200 });
}