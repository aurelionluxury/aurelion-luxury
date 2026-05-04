import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  return NextResponse.json(await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }));
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const body = sanitizeObject(await req.json());
  const t = await prisma.testimonial.create({
    data: {
      name: body.name,
      designation: body.designation,
      company: body.company,
      content: body.content,
      rating: parseInt(body.rating) || 5,
      category: body.category,
      isActive: body.isActive !== false,
    },
  });
  return NextResponse.json(t, { status: 201 });
}
