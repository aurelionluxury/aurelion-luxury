import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const make = searchParams.get("make");
    const type = searchParams.get("type");
    const budget = searchParams.get("budget");
    const year = searchParams.get("year");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = { status: "available" };

    if (make) {
      where.make = make;
    }

    if (type) {
      where.type = type;
    }

    if (year) {
      const yearInt = parseInt(year, 10);
      if (!isNaN(yearInt)) {
        where.year = yearInt;
      }
    }

    if (budget) {
      if (budget === "1-3") {
        where.price = { lte: 3000000 };
      } else if (budget === "3-5") {
        where.price = { lte: 5000000 };
      } else if (budget === "5-10") {
        where.price = { lte: 10000000 };
      } else if (budget === "10+") {
        where.price = { gt: 10000000 };
      }
    }

    const vehicles = await prisma.vehicle.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(vehicles);
  } catch (error) {
    console.error("GET /api/vehicles error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
