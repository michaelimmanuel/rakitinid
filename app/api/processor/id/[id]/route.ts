import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const prisma = new PrismaClient();
  const { id } = params;

  try {
    const formData = await req.formData(); // Get all the data from the form
    const data: Record<string, any> = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log(data); // Log the form data for debugging

    // Handle custom socket type if provided
    if (formData.has('custom_socket_type')) {
        const socket_type = await prisma.socket_type.create({
            data: {
                name: formData.get('custom_socket_type') as string || ''
            }
        });
        if (socket_type) {
          formData.set('socket_type', socket_type.id.toString()); // Set socket_type id
        } else {
          throw new Error('Socket type not found');
        }
        console.log(socket_type);
    } else if (formData.has('socket_type')) {
        const socket_type = await prisma.socket_type.findUnique({
            where: {
                name: formData.get('socket_type') as string || ''
            }
        });
        if (socket_type) {
            formData.set('socket_type', socket_type.id.toString()); // Set socket_type id
        } else {
            throw new Error('Socket type not found');
        }
    }

    // Convert price and socket_type to numbers
    if (formData.has('price')) {
        const price = parseFloat(formData.get('price') as string);
        if (!isNaN(price)) {
            data.price = price; // Store price as a number
        } else {
            throw new Error('Invalid price');
        }
    }

    if (formData.has('socket_type')) {
        const socketTypeId = parseInt(formData.get('socket_type') as string);
        if (!isNaN(socketTypeId)) {
            data.socket_type = {
                connect: { id: socketTypeId } // Connect the socket type by ID
            };
        } else {
            throw new Error('Invalid socket type');
        }
    }

    // Remove the socket_type_id field if it's in the data object
    delete data.socket_type_id; // Prevent passing socket_type_id directly

    console.log(data); // Log the converted data for debugging

    // Perform Prisma update for the processor
    const processor = await prisma.processor.update({
      where: { id: parseInt(id) },
      data: {
        ...data, // Make sure you're not including both socket_type_id and socket_type in the data
      },
    });

    return NextResponse.json(processor); // Respond with the updated processor
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const prisma = new PrismaClient();
  const { id } = params;

  try {
    const processor = await prisma.processor.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(processor); // Respond with the deleted processor
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}