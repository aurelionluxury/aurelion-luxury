import { prisma } from "@/lib/prisma";
import PostsTable from "@/components/admin/PostsTable";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return <PostsTable posts={posts as unknown as Record<string, unknown>[]} />;
}
