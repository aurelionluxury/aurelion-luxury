import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(vehicles);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  try {
    const body = sanitizeObject(await req.json(), ["description"]);
    const vehicle = await prisma.vehicle.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        make: body.make,
        model: body.model,
        year: parseInt(body.year) || new Date().getFullYear(),
        variant: body.variant,
        type: body.type ?? "sedan",
        condition: body.condition ?? "new",
        status: body.status ?? "available",
        price: parseFloat(body.price) || 0,
        priceLabel: body.priceLabel,
        mileage: body.mileage ? parseInt(body.mileage) : null,
        fuel: body.fuel,
        transmission: body.transmission,
        color: body.color,
        interiorColor: body.interiorColor,
        engine: body.engine,
        power: body.power,
        features: body.features,
        images: body.images,
        featured: body.featured === "true" || body.featured === true,
      },
    });
    return NextResponse.json(vehicle, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create vehicle" }, { status: 500 });
  }
}
