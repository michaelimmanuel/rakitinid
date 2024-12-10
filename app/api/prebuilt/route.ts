import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST(req: Request, res: NextResponse) {
   
        

    try{

        const formData = await req.formData();
        const fields: Record<string, any> = {};

        for (const [key, value] of formData.entries()) {
            if (key === 'image' && value instanceof File) {
              const ext = value.name.split('.').pop();
              const fileName = `prebuilt-${Date.now()}.${ext}`;
      
              // Upload file to Vercel Blob
              const blobResult = await put(fileName, await value.arrayBuffer(), {
                contentType: value.type,
                access: 'public',
              });
      
              fields.image = blobResult.url; // Save Blob URL in database
            } else {
              fields[key] = value;
            }

            if (key === 'coverImage' && value instanceof File) {
                const ext = value.name.split('.').pop();
                const fileName = `prebuilt-${Date.now()}.${ext}`;
        
                // Upload file to Vercel Blob
                const blobResult = await put(fileName, await value.arrayBuffer(), {
                  contentType: value.type,
                  access: 'public',
                });
        
                fields.coverImage = blobResult.url; // Save Blob URL in database
              }
        }

        if (fields.price && typeof fields.price === 'string') {
            fields.price = parseFloat(fields.price);
          }

        const newPrebuilt = await prisma.prebuilt.create({
        data: {
            name : fields.name,
            description : fields.description,
            price : fields.price,
            coverImage : fields.coverImage,
            image : fields.image,

        },
        });

    return NextResponse.json(newPrebuilt, { status: 201 });
  } catch (error) {
    console.error("Error creating prebuilt:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const prebuilts = await prisma.prebuilt.findMany();
    return NextResponse.json(prebuilts, { status: 200 });
  } catch (error) {
    console.error("Error fetching prebuilts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
