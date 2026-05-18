import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2)
    return NextResponse.json({ properties: [], vehicles: [], posts: [], faqs: [] });

  const [properties, vehicles, posts, faqs] = await Promise.all([
    prisma.property.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: q } },
          { location: { contains: q } },
          { description: { contains: q } },
          { developerName: { contains: q } },
          { type: { contains: q } },
        ],
      },
      select: { id: true, title: true, slug: true, location: true, type: true, priceLabel: true },
      take: 6,
    }),
    prisma.vehicle.findMany({
      where: {
        OR: [
          { title: { contains: q } },
          { make: { contains: q } },
          { model: { contains: q } },
          { variant: { contains: q } },
        ],
      },
      select: { id: true, title: true, slug: true, make: true, model: true, year: true, priceLabel: true },
      take: 6,
    }),
    prisma.post.findMany({
      where: {
        isPublished: true,
        OR: [
          { title: { contains: q } },
          { excerpt: { contains: q } },
          { category: { contains: q } },
        ],
      },
      select: { id: true, title: true, slug: true, excerpt: true, category: true },
      take: 6,
    }),
    prisma.fAQ.findMany({
      where: {
        isActive: true,
        OR: [
          { question: { contains: q } },
          { answer: { contains: q } },
        ],
      },
      select: { id: true, question: true, answer: true, category: true },
      take: 6,
    }),
  ]);

  return NextResponse.json({ properties, vehicles, posts, faqs });
}