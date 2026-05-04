import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import FAQClient from "@/components/faq/FAQClient";

export const metadata: Metadata = {
  title: "FAQ | Aurelion Luxury",
  description:
    "Answers to common questions about our real estate, automobile, and financial services advisory.",
};

export default async function FAQPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
  return <FAQClient faqs={faqs} />;
}
