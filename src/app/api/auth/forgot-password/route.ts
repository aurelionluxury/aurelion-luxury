import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json({ ok: true }); // Don't reveal if email exists
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save token to DB
    await prisma.admin.update({
      where: { email },
      data: { resetToken: token, resetTokenExpiry: expires },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${token}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Aurelion Luxury" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Admin Password Reset — Aurelion Luxury",
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; background: #0a0a0c; color: #fff; padding: 40px;">
          <h2 style="color: #D4AF37; font-weight: 300; letter-spacing: 0.1em;">AURELION LUXURY</h2>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.7;">You requested a password reset for the Admin Panel.</p>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.7;">Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
          <a href="${resetUrl}" style="display: inline-block; background: #D4AF37; color: #0a0a0c; padding: 14px 32px; text-decoration: none; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; margin: 24px 0;">Reset Password</a>
          <p style="color: rgba(255,255,255,0.4); font-size: 12px;">If you didn't request this, ignore this email. Your password won't change.</p>
          <hr style="border-color: rgba(212,175,55,0.2); margin: 24px 0;">
          <p style="color: rgba(255,255,255,0.25); font-size: 11px;">Aurelion Luxury Admin · Mumbai</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}