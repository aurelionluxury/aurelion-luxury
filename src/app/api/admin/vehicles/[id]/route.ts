import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  const vehicle = await prisma.vehicle.findUnique({ where: { id: parseInt(id) } });
  if (!vehicle) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(vehicle);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  try {
    const body = sanitizeObject(await req.json(), ["description"]);
    const vehicle = await prisma.vehicle.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        make: body.make,
        model: body.model,
        year: parseInt(body.year) || new Date().getFullYear(),
        variant: body.variant,
        type: body.type,
        condition: body.condition,
        status: body.status,
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
    return NextResponse.json(vehicle);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  await prisma.vehicle.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
