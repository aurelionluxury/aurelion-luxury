import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import MumbaiGuideClient from "@/components/mumbai-guide/MumbaiGuideClient";

export const metadata: Metadata = {
  title: "Mumbai Micro-Market Guide | Aurelion Luxury",
  description:
    "Neighbourhood-by-neighbourhood intelligence for luxury buyers in Mumbai — from Malabar Hill to Borivali.",
};

export default async function MumbaiGuidePage() {
  const markets = await prisma.microMarket.findMany({
    orderBy: [{ zone: "asc" }, { name: "asc" }],
  });
  return <MumbaiGuideClient markets={markets} />;
}
