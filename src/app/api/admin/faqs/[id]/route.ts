import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  const body = sanitizeObject(await req.json());
  const faq = await prisma.fAQ.update({
    where: { id: parseInt(id) },
    data: {
      question: body.question,
      answer: body.answer,
      category: body.category,
      order: parseInt(body.order) || 0,
      isActive: body.isActive !== false && body.isActive !== "false",
    },
  });
  return NextResponse.json(faq);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  await prisma.fAQ.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
