import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET(req: Request, ) {
    const prisma = new PrismaClient();
    
    try {
        const casings = await prisma.casing.findMany();
    
        return NextResponse.json(casings, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
