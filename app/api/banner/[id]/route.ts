import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { del } from "@vercel/blob";


export async function DELETE(req: NextRequest,  { params }: { params: { id : string }}) {
    const prisma = new PrismaClient();
    const id = params.id;

    try {
        // delete from blob

        const oldBanner = await prisma.banner.findUnique({
            where: {
                id: parseInt(id)
            }
        });


        if (!oldBanner) {
            return NextResponse.json({ error: 'Banner not found.' }, { status: 404 });
        }

        const url = new URL(oldBanner.src);
        const key = url.pathname.substr(1);

        await del(key);




        const banner = await prisma.banner.delete({
            where: {
                id: parseInt(id)
            }
        });

        return NextResponse.json(banner, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete banner.' }, { status: 500 });
    }
}