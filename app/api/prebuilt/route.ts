import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Upload } from "@aws-sdk/lib-storage"; // Import Upload utility from AWS SDK
import s3 from "@/lib/s3"; // Ensure this is configured properly

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fields: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const ext = value.name.split(".").pop();
        const fileName = `prebuilt-${Date.now()}.${ext}`;
        const bucketName = "rakitin-space"; // Update with your actual bucket name

        try {
          const upload = new Upload({
            client: s3,
            params: {
              Bucket: bucketName,
              Key: fileName,
              Body: value.stream(),
              ContentType: value.type,
              ACL: "public-read",
            },
          });

          const result = await upload.done();
          fields[key] = result.Location; // Save S3 URL in database
        } catch (uploadError) {
          console.error(`Error uploading ${key} to S3:`, uploadError);
          return NextResponse.json(
            { error: `Error uploading ${key} to S3` },
            { status: 500 }
          );
        }
      } else {
        fields[key] = value;
      }
    }

    if (fields.price && typeof fields.price === "string") {
      fields.price = parseFloat(fields.price);
    }

    const newPrebuilt = await prisma.prebuilt.create({
      data: {
        name: fields.name,
        description: fields.description,
        subtitle: fields.subtitle,
        category: fields.category,
        price: fields.price,
        coverImage: fields.coverImage,
        image: fields.image,
        discountPrice: parseInt(fields.discountPrice),
        items: fields.items,
      },
    });

    return NextResponse.json(newPrebuilt, { status: 201 });
  } catch (error) {
    console.error("Error creating prebuilt:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const prebuilts = await prisma.prebuilt.findMany({
      orderBy: {
        price: "asc",
      },
    });

    return NextResponse.json(prebuilts, { status: 200 });
  } catch (error) {
    console.error("Error fetching prebuilts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
