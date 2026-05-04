import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  const body = sanitizeObject(await req.json());
  const item = await prisma.financialService.update({
    where: { id: parseInt(id) },
    data: {
      title: body.title,
      slug: body.slug,
      category: body.category,
      description: body.description || null,
      content: body.content || null,
      icon: body.icon || null,
      features: body.features || null,
      partners: body.partners || null,
      isActive: body.isActive !== false && body.isActive !== "false",
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  await prisma.financialService.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
