import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  const body = sanitizeObject(await req.json());
  const t = await prisma.marketTicker.update({
    where: { id: parseInt(id) },
    data: {
      label: body.label,
      value: body.value,
      change: body.change,
      trend: body.trend,
      category: body.category,
      order: parseInt(body.order) || 0,
      isActive: body.isActive !== false && body.isActive !== "false",
    },
  });
  return NextResponse.json(t);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  await prisma.marketTicker.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
