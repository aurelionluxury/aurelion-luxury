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

// Strips HTML tags from TipTap rich text before injecting into schema
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function FAQPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  // Auto-generates schema from every active FAQ in your database
  // Add new FAQs via your admin panel — schema updates automatically
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(faq.answer),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClient faqs={faqs} />
    </>
  );
}