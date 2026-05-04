import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  return NextResponse.json(await prisma.page.findMany({ orderBy: { slug: "asc" } }));
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const body = sanitizeObject(await req.json(), ["content"]);
  const page = await prisma.page.create({
    data: {
      slug: body.slug,
      title: body.title,
      metaTitle: body.metaTitle || null,
      metaDesc: body.metaDesc || null,
      content: body.content || null,
      isPublished: body.isPublished !== false && body.isPublished !== "false",
    },
  });
  return NextResponse.json(page, { status: 201 });
}
