import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const prebuilts = await prisma.prebuilt.findMany({
        where:{
            category: "Workstation"
        },
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
