import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  return NextResponse.json(await prisma.marketTicker.findMany({ orderBy: { order: "asc" } }));
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const body = sanitizeObject(await req.json());
  const t = await prisma.marketTicker.create({
    data: {
      label: body.label,
      value: body.value,
      change: body.change,
      trend: body.trend,
      category: body.category,
      order: parseInt(body.order) || 0,
      isActive: true,
    },
  });
  return NextResponse.json(t, { status: 201 });
}
