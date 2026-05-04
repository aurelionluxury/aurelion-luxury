import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  const body = await req.json();
  const member = await prisma.teamMember.update({
    where: { id },
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
  return NextResponse.json(member);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  await prisma.teamMember.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
