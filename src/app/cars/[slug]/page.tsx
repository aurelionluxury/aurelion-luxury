import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import CarDetailClient from "@/components/cars/CarDetailClient";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = await prisma.vehicle.findUnique({ where: { slug } });
  if (!v) return { title: "Vehicle | Aurelion Luxury" };
  return {
    title: `${v.year} ${v.title} | Aurelion Luxury`,
    description: `${v.year} ${v.make} ${v.model} ${v.variant ?? ""} — ${v.condition}. ${v.description?.slice(0, 100) ?? ""}`,
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const [vehicle, similar] = await Promise.all([
    prisma.vehicle.findUnique({ where: { slug, status: "available" } }),
    prisma.vehicle.findMany({
      where: { status: "available" },
      take: 4,
      orderBy: { featured: "desc" },
    }),
  ]);
  if (!vehicle) notFound();
  return (
    <CarDetailClient
      vehicle={vehicle}
      similar={similar.filter((v) => v.id !== vehicle.id).slice(0, 2)}
    />
  );
}
