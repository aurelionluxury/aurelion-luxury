import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PropertyDetailClient from "@/components/real-estate/PropertyDetailClient";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const property = await prisma.property.findUnique({ where: { slug } });
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.title} | Aurelion Luxury`,
    description:
      property.description?.slice(0, 155) ??
      `${property.type} in ${property.area}, Mumbai`,
  };
}

export default async function PropertyDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [property, similar] = await Promise.all([
    prisma.property.findUnique({ where: { slug } }),
    prisma.property.findMany({
      where: { published: true },
      take: 4,
      orderBy: { featured: "desc" },
    }),
  ]);
  if (!property) notFound();
  const similarFiltered = similar.filter((p) => p.id !== property.id).slice(0, 2);
  return <PropertyDetailClient property={property} similar={similarFiltered} />;
}
