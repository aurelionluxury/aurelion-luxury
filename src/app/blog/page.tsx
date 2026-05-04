import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import BlogListingClient from "@/components/blog/BlogListingClient";

export const metadata: Metadata = {
  title: "Insights & Market Intelligence | Aurelion Luxury",
  description:
    "Expert insights on Mumbai luxury real estate, automobiles, and wealth management from the Aurelion Luxury team.",
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
