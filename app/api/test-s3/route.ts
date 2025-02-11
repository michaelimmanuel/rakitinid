
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import s3  from "@/lib/s3";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch the list image inside
    const { Buckets } = await s3.send(new ListBucketsCommand({}));
    return NextResponse.json(Buckets, { status: 200 });
  } catch (error) {
    console.error("S3 Connection Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
