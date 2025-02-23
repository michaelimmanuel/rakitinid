import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { revalidatePath } from 'next/cache';
import { ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '@/lib/s3'; // Import the S3 client
import { randomUUID } from 'crypto';

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
    const desktopImage = formData.get('src') as File;
    const mobileImage = formData.get('src_mobile') as File;
    const alt = formData.get('alt') as string;

    if (!desktopImage || !mobileImage) {
        return NextResponse.json({ error: 'Both desktop and mobile images are required.' }, { status: 400 });
    }

    try {
        const uploadImage = async (imageFile: File, prefix: string) => {
            const ext = imageFile.name.split('.').pop();
            const fileName = `${prefix}-${randomUUID()}.${ext}`;
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadParams = {
                Bucket: process.env.DO_SPACES_BUCKET!,
                Key: fileName,
                Body: buffer,
                ContentType: imageFile.type || "application/octet-stream",
                ACL: 'public-read' as ObjectCannedACL,
            };

            const command = new PutObjectCommand(uploadParams);
            await s3.send(command);

            return `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT}/${fileName}`;
        };

        const desktopUrl = await uploadImage(desktopImage, 'banner-desktop');
        const mobileUrl = await uploadImage(mobileImage, 'banner-mobile');

        console.log('Uploaded to:', desktopUrl, mobileUrl);

        const newBanner = await prisma.banner.create({
            data: {
                src: desktopUrl,
                order: 0,
                alt: alt,
                src_mobile: mobileUrl,
            },
        });

        await revalidatePath('/banners');

        return NextResponse.json(newBanner, { status: 201 });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: 'Failed to upload images and create banner.' }, { status: 500 });
    }
}

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
