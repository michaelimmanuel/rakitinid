import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';




const prisma = new PrismaClient();


export async function GET(req: NextRequest) {
    try {
        const banners = await prisma.banner.findMany({
            orderBy: {
            order: 'asc',
            },
        });

        return NextResponse.json(banners, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch banners.' }, { status: 500 });
      }
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const imageFile = formData.get('image') as File;
    const alt = formData.get('alt') as string;

    if (!imageFile) {
        return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
    }

    try {
        const { url } = await put(imageFile.name, imageFile.stream(), {
            access: 'public',
        });

        const newBanner = await prisma.banner.create({
            data: {
                src: url,
                order: 0,
                alt: alt
            },
        });

        await revalidatePath('/banners');

        return NextResponse.json(newBanner, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to upload image and create banner.' }, { status: 500 });
    }
}

// batch update banners

export async function PUT(req: NextRequest) {
    const newBanners = await req.json();

    try {
        const updatedBanners = await Promise.all(
            newBanners.map(async (banner: any) => {
                return await prisma.banner.update({
                    where: {
                        id: banner.id,
                    },
                    data: {
                        order: banner.order,
                    },
                });
            })
        );


        return NextResponse.json(updatedBanners, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update banners.' }, { status: 500 });
    }
}