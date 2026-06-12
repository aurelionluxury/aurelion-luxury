import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import BlogListingClient from "@/components/blog/BlogListingClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Luxury Real Estate Blog | Mumbai Property Insights & Market Updates",
  description: "Expert insights, market analysis, and buying guides for luxury real estate in Mumbai. Stay updated on South Mumbai property trends, price movements, NRI rules, and investment opportunities.",
  keywords: ["mumbai luxury real estate blog", "south mumbai property market 2026", "luxury property investment india", "mumbai real estate insights"],
  alternates: { canonical: "https://www.aurelionluxury.com/blog" },
  openGraph: {
    title: "Luxury Real Estate Blog | Aurelion Luxury",
    description: "Mumbai luxury property insights, market updates, and expert buying guides.",
    url: "https://www.aurelionluxury.com/blog",
  },
};

type SP = Promise<{ category?: string }>;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const params = await searchParams;
  const where: Record<string, unknown> = { isPublished: true };
  if (params.category && params.category !== "all")
    where.category = params.category;
  const posts = await prisma.post.findMany({
    where,
    orderBy: { publishedAt: "desc" },
  });
  return (
    <BlogListingClient
      posts={posts}
      currentCategory={params.category || "all"}
    />
  );
}