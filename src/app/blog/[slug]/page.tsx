import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BlogPostClient from "@/components/blog/BlogPostClient";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, isPublished: true },
  });
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Aurelion Luxury`,
    description: (post as Record<string, unknown>).metaDesc as string || post.excerpt || "",
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [post, related] = await Promise.all([
    prisma.post.findUnique({ where: { slug, isPublished: true } }),
    prisma.post.findMany({
      where: { isPublished: true },
      take: 4,
      orderBy: { publishedAt: "desc" },
    }),
  ]);
  if (!post) notFound();
  const relatedFiltered = related.filter((p) => p.id !== post.id).slice(0, 3);
  return <BlogPostClient post={post} related={relatedFiltered} />;
}
