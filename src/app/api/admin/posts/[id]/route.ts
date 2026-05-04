import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  try {
    const raw = await req.json();
    const body = sanitizeObject(raw);
    const isPublished = raw.isPublished === true || raw.isPublished === "true";
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: raw.content ?? "",
        category: body.category,
        coverImage: body.coverImage,
        tags: body.tags,
        isPublished,
        publishedAt: isPublished ? new Date() : null,
        metaTitle: body.metaTitle,
        metaDesc: body.metaDesc,
        author: body.author,
      },
    });
    return NextResponse.json(post);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const { id } = await params;
  await prisma.post.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
