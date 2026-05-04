import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message, source, propertyId, vehicleId, budget } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "name is required" },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim() === "") {
      return NextResponse.json(
        { error: "phone is required" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email ?? null,
        service: service ?? null,
        message: message ?? null,
        source: source ?? null,
        propertyId: propertyId ?? null,
        vehicleId: vehicleId ?? null,
        budget: budget ?? null,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
