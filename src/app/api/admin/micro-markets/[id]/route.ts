import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  const body = sanitizeObject(await req.json());
  const item = await prisma.microMarket.update({
    where: { id: parseInt(id) },
    data: {
      name: body.name,
      slug: body.slug,
      zone: body.zone,
      description: body.description || null,
      content: body.content || null,
      avgPrice: body.avgPrice ? parseFloat(body.avgPrice) : null,
      priceRange: body.priceRange || null,
      connectivity: body.connectivity || null,
      landmarks: body.landmarks || null,
      images: body.images || null,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  await prisma.microMarket.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
