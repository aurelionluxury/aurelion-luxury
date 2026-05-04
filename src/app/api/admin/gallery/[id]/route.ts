import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  const body = sanitizeObject(await req.json());
  const item = await prisma.gallery.update({
    where: { id: parseInt(id) },
    data: {
      url: body.url,
      title: body.title || null,
      alt: body.alt || null,
      category: body.category || null,
      order: parseInt(body.order) || 0,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  await prisma.gallery.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
