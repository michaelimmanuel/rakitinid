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
    const imageFile = formData.get('image') as File;
    const alt = formData.get('alt') as string;

    if (!imageFile) {
        return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
    }

    try {
        const ext = imageFile.name.split('.').pop();
        const fileName = `banner-${randomUUID()}.${ext}`;
        // upload to DigitalOcean Spaces (S3)
        const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: fileName,
            Body: imageFile,
            ContentType: imageFile.type,
            ACL: 'public-read' as ObjectCannedACL,
        };

        const command = new PutObjectCommand(uploadParams);
        await s3.send(command);

        const url = `https://${process.env.S3_BUCKET_NAME}.${process.env.S3_ENDPOINT}/${fileName}`;

        const newBanner = await prisma.banner.create({
            data: {
                src: url,
                order: 0,
                alt: alt,
                src_mobile: url,
            },
        });

        await revalidatePath('/banners');

        return NextResponse.json(newBanner, { status: 201 });
    } catch (error) {
        console.log(error);
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