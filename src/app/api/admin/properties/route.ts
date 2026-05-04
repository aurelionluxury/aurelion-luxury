import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const properties = await prisma.property.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(properties);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  try {
    const body = sanitizeObject(await req.json(), ["description"]);
    const property = await prisma.property.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        location: body.location,
        area: body.area,
        type: body.type,
        status: body.status ?? "available",
        price: parseFloat(body.price) || 0,
        priceLabel: body.priceLabel,
        bedrooms: body.bedrooms ? parseInt(body.bedrooms) : null,
        bathrooms: body.bathrooms ? parseInt(body.bathrooms) : null,
        carpetArea: body.carpetArea ? parseFloat(body.carpetArea) : null,
        builtUpArea: body.builtUpArea ? parseFloat(body.builtUpArea) : null,
        floor: body.floor ? parseInt(body.floor) : null,
        totalFloors: body.totalFloors ? parseInt(body.totalFloors) : null,
        facing: body.facing,
        amenities: body.amenities,
        images: body.images,
        featured: body.featured === "true" || body.featured === true,
        developerName: body.developerName,
        reraNumber: body.reraNumber,
        possession: body.possession,
        typology: body.typology || null,
        config: body.config || null,
        published: body.published !== false && body.published !== "false",
      },
    });
    return NextResponse.json(property, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}
