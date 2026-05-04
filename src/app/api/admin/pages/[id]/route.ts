import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  const body = sanitizeObject(await req.json(), ["content"]);
  const page = await prisma.page.update({
    where: { id: parseInt(id) },
    data: {
      title: body.title,
      metaTitle: body.metaTitle || null,
      metaDesc: body.metaDesc || null,
      content: body.content || null,
      isPublished: body.isPublished !== false && body.isPublished !== "false",
    },
  });
  return NextResponse.json(page);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  await prisma.page.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
