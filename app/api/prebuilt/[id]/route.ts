import { put, del } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { NextRequest, NextResponse } from 'next/server';


const prisma = new PrismaClient();


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    
    const { id } = params;
    
    // cast id to number

    
    // get data from form
    const formData = await req.formData();
    const fields: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {

        if (key === 'image' && value instanceof File) {
            const ext = value.name.split('.').pop();
            const fileName = `prebuilt-${id}.${ext}`;
            
            // Upload file to Vercel Blob
            const blobResult = await put(fileName, await value.arrayBuffer(), {
            contentType: value.type,
            access: 'public', 
            });
            fields.image = blobResult.url; // Save Blob URL in database
        } else if (key === 'coverImage' && value instanceof File) {
            const ext = value.name.split('.').pop();
            const fileName = `prebuilt-cover-${id}.${ext}`;
            
            // Upload file to Vercel Blob
            const blobResult = await put(fileName, await value.arrayBuffer(), {
            contentType: value.type,
            access: 'public', 
            });
            fields.coverImage = blobResult.url; // Save Blob URL in database
        } else {
            fields[key] = value;
        }
    }

    fields.price = parseFloat(fields.price);

    // delete the old image
    const oldPrebuilt = await prisma.prebuilt.findUnique({
        where: {id : parseInt(id)},
    });

    if (oldPrebuilt?.image) {
        const image = oldPrebuilt.image.split('/').pop();
        await del(image!);
    }

    if (oldPrebuilt?.coverImage) {
        const coverImage = oldPrebuilt.coverImage.split('/').pop();
        await del(coverImage!);
    }


    // Update the record in the database
    const prebuilt = await prisma.prebuilt.update({
        where: { id: parseInt(id) },
        data: fields,
    });

    return NextResponse.json(prebuilt, { status: 200 });

  
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url!, `http://${req.headers.host}`); // Parse the URL from the request
  const id = parseInt(url.pathname.split('/').pop()!); // Extract `id` from the URL

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const prebuilt = await prisma.prebuilt.findUnique({
    where: { id },
  });

  if (!prebuilt) {
    return NextResponse.json({ error: 'Prebuilt not found' }, { status: 404 });
  }

  if (prebuilt.image) {
    const image = prebuilt.image
    await del(image!);
  }

  if (prebuilt.coverImage) {
    const coverImage = prebuilt.coverImage
    await del(coverImage!);
  }
  await prisma.prebuilt.delete({
    where: { id },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}