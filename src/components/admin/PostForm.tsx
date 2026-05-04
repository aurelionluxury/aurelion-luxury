"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea, Select, Checkbox } from "./AdminFormField";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";

interface PostFormProps {
  initial?: Record<string, unknown>;
  isEdit?: boolean;
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function PostForm({ initial, isEdit }: PostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: String(initial?.title ?? ""),
    slug: String(initial?.slug ?? ""),
    excerpt: String(initial?.excerpt ?? ""),
    content: String(initial?.content ?? ""),
    category: String(initial?.category ?? "market_trends"),
    coverImage: String(initial?.coverImage ?? ""),
    tags: String(initial?.tags ?? ""),
    isPublished: Boolean(initial?.isPublished),
    metaTitle: String(initial?.metaTitle ?? ""),
    metaDesc: String(initial?.metaDesc ?? ""),
    author: String(initial?.author ?? "Aurelion Luxury"),
  });

  const set = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/admin/posts/${initial?.id}` : "/api/admin/posts";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/posts");
      router.refresh();
    } else {
      const d = await res.json();
      setError(d.error ?? "Failed to save");
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-[#6B6B6B] hover:text-[#C9A84C] text-xs tracking-widest uppercase">← Back</button>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">
          {isEdit ? "Edit Post" : "New Blog Post"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-5">
            <Field label="Title" required>
              <Input value={form.title} onChange={(e) => { set("title", e.target.value); if (!isEdit) set("slug", slugify(e.target.value)); }} required />
            </Field>
            <Field label="Excerpt" hint="Short summary shown in blog listing">
              <Textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} />
            </Field>
            <Field label="Content" required>
              <RichTextEditor value={form.content} onChange={(v) => set("content", v)} />
            </Field>
          </div>

          {/* SEO */}
          <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-5">
            <h2 className="text-xs tracking-widest uppercase text-[#C9A84C]">SEO</h2>
            <Field label="Meta Title" hint="Defaults to post title if empty">
              <Input value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} />
            </Field>
            <Field label="Meta Description" hint="150–160 characters">
              <Textarea value={form.metaDesc} onChange={(e) => set("metaDesc", e.target.value)} rows={2} />
            </Field>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-[#111111] border border-[#C9A84C]/10 p-5 space-y-4">
            <h2 className="text-xs tracking-widest uppercase text-[#C9A84C]">Publish</h2>
            <Checkbox label="Publish post" checked={form.isPublished} onChange={(e) => set("isPublished", e.target.checked)} />
            <div className="pt-2 border-t border-[#C9A84C]/10 flex gap-3">
              <button type="submit" disabled={saving} className="flex-1 bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase py-2.5 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50">
                {saving ? "Saving…" : isEdit ? "Update" : "Create"}
              </button>
              <button type="button" onClick={() => router.back()} className="border border-[#C9A84C]/20 text-[#6B6B6B] text-xs tracking-widest uppercase px-3 py-2.5 hover:border-[#C9A84C]/40 transition-colors">✕</button>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#C9A84C]/10 p-5 space-y-4">
            <h2 className="text-xs tracking-widest uppercase text-[#C9A84C]">Details</h2>
            <Field label="Category">
              <Select value={form.category} onChange={(e) => set("category", e.target.value)}>
                {["real_estate", "automobiles", "financial_planning", "market_trends"].map(c => (
                  <option key={c} value={c}>{c.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</option>
                ))}
              </Select>
            </Field>
            <Field label="Slug">
              <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
            </Field>
            <Field label="Author">
              <Input value={form.author} onChange={(e) => set("author", e.target.value)} />
            </Field>
            <Field label="Tags" hint="Comma-separated">
              <Input value={form.tags} onChange={(e) => set("tags", e.target.value)} />
            </Field>
          </div>

          <div className="bg-[#111111] border border-[#C9A84C]/10 p-5 space-y-3">
            <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-2">Cover Image</h2>
            <ImageUploader value={form.coverImage} onChange={(urls) => set("coverImage", urls.split(",")[0]?.trim() ?? "")} />
          </div>
        </div>
      </form>

      {error && <p className="text-red-400 text-xs border border-red-400/20 bg-red-400/5 px-3 py-2 mt-4">{error}</p>}
    </div>
  );
}
