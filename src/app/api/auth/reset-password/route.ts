import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();
    const admin = await prisma.admin.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    });
    if (!admin) {
      return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 });
    }
    const hash = await bcrypt.hash(password, 12);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hash, resetToken: null, resetTokenExpiry: null },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Reset failed." }, { status: 500 });
  }
}