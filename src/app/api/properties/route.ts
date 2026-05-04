import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const bedrooms = searchParams.get("bedrooms");
    const budget = searchParams.get("budget");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = { status: "available" };

    if (location) {
      where.area = { contains: location };
    }

    if (type) {
      where.type = type;
    }

    if (bedrooms) {
      const bedroomsInt = parseInt(bedrooms, 10);
      if (!isNaN(bedroomsInt)) {
        where.bedrooms = bedroomsInt;
      }
    }

    if (budget) {
      if (budget === "1-3") {
        where.price = { lte: 30000000 };
      } else if (budget === "3-5") {
        where.price = { lte: 50000000 };
      } else if (budget === "5-10") {
        where.price = { lte: 100000000 };
      } else if (budget === "10+") {
        where.price = { gt: 100000000 };
      }
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
