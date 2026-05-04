import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, isUnauthorized } from "@/lib/admin-auth";
import { sanitizeObject, sanitizeString } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isUnauthorized(auth)) return auth;
  try {
    const raw = await req.json();
    const body = sanitizeObject(raw);
    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: raw.content ?? "", // rich text — don't sanitize
        category: body.category ?? "market_trends",
        coverImage: body.coverImage,
        tags: body.tags,
        isPublished: raw.isPublished === true || raw.isPublished === "true",
        publishedAt: raw.isPublished ? new Date() : null,
        metaTitle: body.metaTitle,
        metaDesc: body.metaDesc,
        author: body.author ?? "Aurelion Luxury",
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
