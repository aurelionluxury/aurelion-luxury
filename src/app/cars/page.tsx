export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import CarsClient from "@/components/cars/CarsClient";

export const metadata: Metadata = {
  title: "Luxury Automobiles Mumbai | Aurelion Luxury",
  description:
    "Curated luxury vehicles in Mumbai — Mercedes, BMW, Porsche, Range Rover. Engineering-grade evaluation. Zero buyer fee.",
};

type SP = Promise<{
  make?: string;
  bodyType?: string;
  condition?: string;
  budget?: string;
}>;

export default async function CarsPage({ searchParams }: { searchParams: SP }) {
  const params = await searchParams;
  const where: Record<string, unknown> = { status: "available" };
  if (params.make) where.make = params.make;
  if (params.bodyType) where.type = { equals: params.bodyType, mode: "insensitive" };
  if (params.condition) where.condition = { equals: params.condition, mode: "insensitive" };
  if (params.budget) {
    const ranges: Record<string, { lte?: number; gte?: number }> = {
      "below-50": { lte: 5000000 },
      "50-100": { gte: 5000000, lte: 10000000 },
      "1-3cr": { gte: 10000000, lte: 30000000 },
      "3cr-plus": { gte: 30000000 },
    };
    if (ranges[params.budget]) where.price = ranges[params.budget];
  }

  const vehicles = await prisma.vehicle.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 12,
  });
  const total = await prisma.vehicle.count({ where });

  return <CarsClient vehicles={vehicles} total={total} currentParams={params} />;
}
