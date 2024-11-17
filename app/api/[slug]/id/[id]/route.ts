import multer from 'multer';

import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { IncomingMessage } from 'http';
const prisma = new PrismaClient();
import { NextApiRequest, NextApiResponse } from 'next';


type Slug = 'casing' | 'processor' | 'gpu' | 'motherboard' | 'psu' | 'ram' | 'storage'; // Update this list with your actual models

const modelMap: Record<Slug, any> = {
  casing: prisma.casing,
  processor: prisma.processor,
  gpu: prisma.gpu,
  motherboard: prisma.motherboard,
  psu: prisma.psu,
  ram: prisma.ram,
  storage: prisma.storage,
};


// Configure multer storage and file naming
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const { slug } = req.params;
      const dir = path.join(process.cwd(), 'public/images', slug);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const itemName = req.body.name || req.params.slug;
      const formattedItemName = itemName.toLowerCase().replace(/\s+/g, '-');
      const ext = path.extname(file.originalname);
      const filename = `${formattedItemName}${ext}`;
      cb(null, filename);
    }
  });

  const upload = multer({ storage });
  


export async function GET(req: Request, { params }: { params: { slug:Slug, id: number } }) {
  const { slug, id } = params;

  const db = modelMap[slug];
  try {
    const casings = await db.findFirst({
      where: {
        id: id,
      },
    });

    return NextResponse.json(casings, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}




export async function PUT(req: Request, { params }: { params: { slug: Slug; id: string } }) {
    const { slug, id } = params;
  
    if (!slug || !id) {
      return NextResponse.json({ error: 'Missing slug or id in the request' }, { status: 400 });
    }
  
    const db = modelMap[slug];
    try {
      // Parse the form data (body and file)
      const formData = await req.formData();
      const fields: Record<string, any> = {};
      for (const [key, value] of formData.entries()) {
        if (key === 'image' && value instanceof File) {
          const ext = path.extname(value.name);
          const fileName = `${slug}-${id}${ext}`;
          const filePath = path.join(process.cwd(), 'public/images', slug, fileName);
          
          await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
          fs.promises.writeFile(filePath, new Uint8Array(await value.arrayBuffer()));
          
          fields.image = `/images/${slug}/${fileName}`;
        } else {
          fields[key] = value;
        }
      }
  
      // Convert price if it's a string
      if (fields.price && typeof fields.price === 'string') {
        fields.price = parseFloat(fields.price);
      }

      if (fields.socket_type_id && typeof fields.socket_type_id === 'string') {
        fields.socket_type_id = parseInt(fields.socket_type_id, 10);
      }
  
      // Strip id to avoid overwriting it
      delete fields.id;
  
      // Update the database record
      const updatedData = await db.update({
        where: { id: parseInt(id) },
        data: fields,
      });
  
      return NextResponse.json({ message: 'Updated successfully', updated: updatedData }, { status: 200 });
    } catch (error: any) {
      console.error('Error in PUT handler:', error);
      return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }

export async function DELETE(req: Request,{ params }: { params: { slug:Slug, id: string } }) {
  const { slug, id } = params;

  const db = modelMap[slug];

  try {
    // delete image file
    const casing = await db.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    const imagePath = path.join(process.cwd(), 'public', casing.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    


    const deletedCasing = await db.delete({
      where: {
        id: parseInt(id),
      },
    });


    return NextResponse.json({ message: "Deleted successfully", deleted: deletedCasing }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}