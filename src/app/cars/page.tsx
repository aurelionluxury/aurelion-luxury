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
  if (params.bodyType) where.type = params.bodyType;
  if (params.condition) where.condition = params.condition;

  const vehicles = await prisma.vehicle.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 12,
  });
  const total = await prisma.vehicle.count({ where });

  return <CarsClient vehicles={vehicles} total={total} currentParams={params} />;
}
