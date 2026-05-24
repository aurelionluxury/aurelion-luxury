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

  const priceFilter = (() => {
    if (!params.budget) return undefined;
    const ranges: Record<string, { lte?: number; gte?: number }> = {
      "below-50": { lte: 5000000 },
      "50-100": { gte: 5000000, lte: 10000000 },
      "1-3cr": { gte: 10000000, lte: 30000000 },
      "3cr-plus": { gte: 30000000 },
    };
    return ranges[params.budget] ?? undefined;
  })();

  const vehicles = await prisma.vehicle.findMany({
    where: {
      status: "available",
      ...(params.make ? { make: { equals: params.make, mode: "insensitive" } } : {}),
      ...(params.bodyType ? { type: { equals: params.bodyType, mode: "insensitive" } } : {}),
      ...(params.condition ? { condition: { equals: params.condition, mode: "insensitive" } } : {}),
      ...(priceFilter ? { price: priceFilter } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  const total = await prisma.vehicle.count({
    where: {
      status: "available",
      ...(params.make ? { make: { equals: params.make, mode: "insensitive" } } : {}),
      ...(params.bodyType ? { type: { equals: params.bodyType, mode: "insensitive" } } : {}),
      ...(params.condition ? { condition: { equals: params.condition, mode: "insensitive" } } : {}),
      ...(priceFilter ? { price: priceFilter } : {}),
    },
  });

  return <CarsClient vehicles={vehicles} total={total} currentParams={params} />;
}