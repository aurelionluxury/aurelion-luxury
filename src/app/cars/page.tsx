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

  const baseWhere: any = {
    status: "available",
    ...(params.make ? { make: params.make } : {}),
    ...(params.bodyType ? { type: params.bodyType } : {}),
    ...(params.condition ? { condition: params.condition } : {}),
    ...(params.budget === "below-50" ? { price: { lte: 0.5 } } : {}),
    ...(params.budget === "50-100" ? { price: { gte: 0.5, lte: 1 } } : {}),
    ...(params.budget === "1-3cr" ? { price: { gte: 1, lte: 3 } } : {}),
    ...(params.budget === "3cr-plus" ? { price: { gte: 3 } } : {}),
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