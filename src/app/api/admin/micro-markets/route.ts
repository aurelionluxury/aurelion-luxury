import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  return NextResponse.json(await prisma.microMarket.findMany({ orderBy: [{ zone: "asc" }, { name: "asc" }] }));
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const body = sanitizeObject(await req.json());
  const base = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const slug = body.slug || `${base}-${Date.now()}`;
  const item = await prisma.microMarket.create({
    data: {
      name: body.name,
      slug,
      zone: body.zone ?? "central",
      description: body.description || null,
      content: body.content || null,
      avgPrice: body.avgPrice ? parseFloat(body.avgPrice) : null,
      priceRange: body.priceRange || null,
      connectivity: body.connectivity || null,
      landmarks: body.landmarks || null,
      images: body.images || null,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
