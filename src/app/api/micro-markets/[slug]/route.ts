import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const microMarket = await prisma.microMarket.findUnique({
      where: { slug },
    });

    if (!microMarket) {
      return NextResponse.json(
        { error: "Micro-market not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(microMarket);
  } catch (error) {
    console.error("GET /api/micro-markets/[slug] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
