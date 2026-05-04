import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  return NextResponse.json(await prisma.gallery.findMany({ orderBy: { order: "asc" } }));
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const body = sanitizeObject(await req.json());
  const item = await prisma.gallery.create({
    data: {
      url: body.url,
      title: body.title || null,
      alt: body.alt || null,
      category: body.category || null,
      order: parseInt(body.order) || 0,
    },
  });
  return NextResponse.json(item, { status: 201 });
}
