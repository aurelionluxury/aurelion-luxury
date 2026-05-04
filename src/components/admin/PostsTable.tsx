"use client";

import AdminTable from "./AdminTable";

export default function PostsTable({ posts }: { posts: Record<string, unknown>[] }) {
  return (
    <AdminTable
      title="Blog Posts"
      newHref="/admin/posts/new"
      data={posts}
      editHrefBase="/admin/posts"
      deleteEndpointBase="/api/admin/posts"
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category", render: (v) => String(v).replace(/_/g, " ") },
        {
          key: "isPublished",
          label: "Status",
          render: (v) => (
            <span className={`border px-2 py-0.5 text-[10px] tracking-widest uppercase ${
              v ? "text-emerald-400 border-emerald-400/30" : "text-[#6B6B6B] border-[#6B6B6B]/30"
            }`}>
              {v ? "Published" : "Draft"}
            </span>
          ),
        },
        { key: "views", label: "Views" },
        {
          key: "createdAt",
          label: "Created",
          render: (v) => new Date(String(v)).toLocaleDateString("en-IN"),
        },
      ]}
    />
  );
}
