import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const members = await prisma.teamMember.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(members);
}
