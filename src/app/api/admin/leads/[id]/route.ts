import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeString } from "@/lib/sanitize";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  const { status, notes } = await req.json();
  const lead = await prisma.lead.update({
    where: { id: parseInt(id) },
    data: {
      status: sanitizeString(status),
      notes: sanitizeString(notes),
    },
  });
  return NextResponse.json(lead);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  await prisma.lead.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
