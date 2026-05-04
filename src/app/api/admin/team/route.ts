import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(members);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const body = await req.json();
  const member = await prisma.teamMember.create({
    data: {
      name: body.name,
      title: body.title,
      bio: body.bio || null,
      image: body.image || null,
      email: body.email || null,
      linkedin: body.linkedin || null,
      phone: body.phone || null,
      order: parseInt(body.order) || 0,
      published: body.published !== false && body.published !== "false",
    },
  });
  return NextResponse.json(member, { status: 201 });
}
