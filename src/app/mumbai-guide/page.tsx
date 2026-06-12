import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import MumbaiGuideClient from "@/components/mumbai-guide/MumbaiGuideClient";

export const metadata: Metadata = {
  title: "Mumbai Luxury Real Estate Guide 2026 | Neighbourhoods, Prices & Insights",
  description: "Your complete guide to luxury real estate in Mumbai. Explore South Mumbai's top neighbourhoods — Worli, Pedder Road, Cuffe Parade, Malabar Hill — with price ranges, area insights, and expert buying advice.",
  keywords: ["mumbai luxury real estate guide", "south mumbai property prices 2026", "best areas luxury property mumbai", "worli vs pedder road property"],
  alternates: { canonical: "https://www.aurelionluxury.com/mumbai-guide" },
  openGraph: {
    title: "Mumbai Luxury Real Estate Guide 2026 | Aurelion Luxury",
    description: "Neighbourhoods, price ranges, and expert insights for luxury property buyers in South Mumbai.",
    url: "https://www.aurelionluxury.com/mumbai-guide",
  },
};

export default async function MumbaiGuidePage() {
  const markets = await prisma.microMarket.findMany({
    orderBy: [{ zone: "asc" }, { name: "asc" }],
  });
  return <MumbaiGuideClient markets={markets} />;
}