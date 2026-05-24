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

  const baseWhere = {
    status: "available",
    ...(params.make ? { make: { equals: params.make, mode: "insensitive" as const } } : {}),
    ...(params.bodyType ? { type: { equals: params.bodyType, mode: "insensitive" as const } } : {}),
    ...(params.condition ? { condition: { equals: params.condition, mode: "insensitive" as const } } : {}),
    ...(params.budget === "below-50" ? { price: { lte: 5000000 } } : {}),
    ...(params.budget === "50-100" ? { price: { gte: 5000000, lte: 10000000 } } : {}),
    ...(params.budget === "1-3cr" ? { price: { gte: 10000000, lte: 30000000 } } : {}),
    ...(params.budget === "3cr-plus" ? { price: { gte: 30000000 } } : {}),
  };

  const [vehicles, total] = await Promise.all([
    prisma.vehicle.findMany({
      where: baseWhere,
      orderBy: { createdAt: "desc" },
      take: 12,
    }),
    prisma.vehicle.count({ where: baseWhere }),
  ]);

  return <CarsClient vehicles={vehicles} total={total} currentParams={params} />;
}