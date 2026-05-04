import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import MicroMarketDetailClient from "@/components/mumbai-guide/MicroMarketDetailClient";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const m = await prisma.microMarket.findUnique({ where: { slug } });
  if (!m) return { title: "Area Not Found | Aurelion Luxury" };
  return {
    title: `${m.name} Real Estate Guide | Aurelion Luxury`,
    description:
      m.description?.slice(0, 155) ??
      `Luxury real estate in ${m.name}, ${m.zone}.`,
  };
}

export default async function MicroMarketDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const market = await prisma.microMarket.findUnique({ where: { slug } });
  if (!market) notFound();
  return <MicroMarketDetailClient market={market} />;
}
