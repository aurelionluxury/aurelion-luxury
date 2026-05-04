import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import RealEstateClient from "@/components/real-estate/RealEstateClient";

export const metadata: Metadata = {
  title: "Luxury Properties in Mumbai | Aurelion Luxury",
  description:
    "Curated luxury residential and commercial properties from South Mumbai to Borivali — personally vetted by Aurelion Luxury.",
};

type SP = Promise<{
  location?: string;
  type?: string;
  budget?: string;
  bedrooms?: string;
  page?: string;
}>;

export default async function RealEstatePage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const params = await searchParams;

  const where: Record<string, unknown> = { published: true };
  if (params.location) where.area = params.location;
  if (params.type) where.type = params.type;
  if (params.bedrooms) where.bedrooms = parseInt(params.bedrooms);
  if (params.budget) {
    const ranges: Record<string, { lte?: number; gte?: number }> = {
      "1-3": { lte: 30000000 },
      "3-5": { lte: 50000000, gte: 30000000 },
      "5-10": { lte: 100000000, gte: 50000000 },
      "10+": { gte: 100000000 },
    };
    if (ranges[params.budget]) where.price = ranges[params.budget];
  }

  const page = parseInt(params.page || "1");
  const [properties, total, newProjects] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 9,
      skip: (page - 1) * 9,
    }),
    prisma.property.count({ where }),
    prisma.property.findMany({
      where: { status: { in: ["new_launch", "under_construction", "ready_to_move"] } },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      select: {
        id: true, title: true, slug: true, location: true, area: true,
        developerName: true, typology: true, config: true, possession: true,
        priceLabel: true, price: true, status: true, featured: true,
      },
    }),
  ]);

  return (
    <RealEstateClient
      properties={properties}
      total={total}
      currentPage={page}
      currentParams={params}
      newProjects={newProjects}
    />
  );
}
