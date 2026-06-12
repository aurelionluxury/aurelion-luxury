import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import FAQClient from "@/components/faq/FAQClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Luxury Real Estate FAQ Mumbai | Common Questions Answered",
  description: "Answers to the most common questions about buying luxury property in South Mumbai — prices, neighbourhoods, NRI rules, legal process, and what to expect. Expert guidance from Aurelion Luxury.",
  keywords: ["luxury real estate faq mumbai", "buying property south mumbai guide", "mumbai property price per sqft", "how to buy flat mumbai", "luxury flat buying process india"],
  alternates: { canonical: "https://www.aurelionluxury.com/faq" },
  openGraph: {
    title: "Luxury Real Estate FAQ Mumbai | Aurelion Luxury",
    description: "Common questions about buying luxury property in South Mumbai — answered by experts.",
    url: "https://www.aurelionluxury.com/faq",
  },
};

export default async function FAQPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
  return <FAQClient faqs={faqs} />;
}