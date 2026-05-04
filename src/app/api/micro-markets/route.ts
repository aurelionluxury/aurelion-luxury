import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_request: NextRequest) {
  try {
    const microMarkets = await prisma.microMarket.findMany({
      orderBy: [{ zone: "asc" }, { name: "asc" }],
    });

    return NextResponse.json(microMarkets);
  } catch (error) {
    console.error("GET /api/micro-markets error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
