import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeString } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { key, value } = await req.json();
  const setting = await prisma.siteSetting.upsert({
    where: { key: sanitizeString(key) },
    update: { value: sanitizeString(value) },
    create: { key: sanitizeString(key), value: sanitizeString(value) },
  });
  return NextResponse.json(setting);
}
