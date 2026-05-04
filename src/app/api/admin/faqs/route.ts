import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  return NextResponse.json(await prisma.fAQ.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }));
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const body = sanitizeObject(await req.json());
  const faq = await prisma.fAQ.create({
    data: {
      question: body.question,
      answer: body.answer,
      category: body.category ?? "general",
      order: parseInt(body.order) || 0,
      isActive: true,
    },
  });
  return NextResponse.json(faq, { status: 201 });
}
