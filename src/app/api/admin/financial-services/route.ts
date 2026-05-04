import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  return NextResponse.json(await prisma.financialService.findMany({ orderBy: { category: "asc" } }));
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const body = sanitizeObject(await req.json());
  const base = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const slug = `${base}-${Date.now()}`;
  const item = await prisma.financialService.create({
    data: {
      title: body.title,
      slug: body.slug || slug,
      category: body.category ?? "loans",
      description: body.description || null,
      content: body.content || null,
      icon: body.icon || null,
      features: body.features || null,
      partners: body.partners || null,
      isActive: true,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
