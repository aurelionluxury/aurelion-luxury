"use client";

import { useEffect, useState } from "react";
import { Field, Input, Select } from "@/components/admin/AdminFormField";
import ImageUploader from "@/components/admin/ImageUploader";

interface GalleryItem {
  id: number;
  url: string;
  title: string | null;
  alt: string | null;
  category: string | null;
  order: number;
}

const empty = (): Omit<GalleryItem, "id"> => ({
  url: "", title: "", alt: "", category: "general", order: 0,
});

const CATEGORIES = ["general", "real_estate", "automobiles", "office", "events"];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<Partial<GalleryItem> | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/gallery");
    setItems(await r.json());
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const isEdit = "id" in editing;
    await fetch(isEdit ? `/api/admin/gallery/${editing.id}` : "/api/admin/gallery", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    setSaving(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    load();
  }

  const set = (key: string, value: string | number) =>
    setEditing((e) => e ? { ...e, [key]: value } : e);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">Gallery</h1>
        <button onClick={() => setEditing(empty())} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium">+ Add Image</button>
      </div>

      {editing && (
        <div className="bg-[#111111] border border-[#C9A84C]/20 p-6 mb-6 space-y-4">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C]">{"id" in editing ? "Edit Image" : "Add Image"}</h2>
          <Field label="Image">
            <ImageUploader
              value={editing.url ?? ""}
              onChange={(urls) => set("url", urls.split(",")[0]?.trim() ?? "")}
            />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Title">
              <Input value={editing.title ?? ""} onChange={(e) => set("title", e.target.value)} />
            </Field>
            <Field label="Alt Text" hint="For accessibility/SEO">
              <Input value={editing.alt ?? ""} onChange={(e) => set("alt", e.target.value)} />
            </Field>
            <Field label="Category">
              <Select value={editing.category ?? "general"} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</option>)}
              </Select>
            </Field>
          </div>
          <Field label="Order" hint="Lower = appears first">
            <Input type="number" value={String(editing.order ?? 0)} onChange={(e) => set("order", parseInt(e.target.value) || 0)} />
          </Field>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
            <button onClick={() => setEditing(null)} className="border border-[#C9A84C]/20 text-[#6B6B6B] text-xs tracking-widest uppercase px-5 py-2.5 hover:border-[#C9A84C]/40 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((img) => (
          <div key={img.id} className="group relative bg-[#111111] border border-[#C9A84C]/10 overflow-hidden">
            <div className="aspect-video bg-[#1A1A1A]">
              {img.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img.url} alt={img.alt ?? ""} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-3">
              <p className="text-xs text-[#FFFAEC] truncate">{img.title || "Untitled"}</p>
              <p className="text-[10px] text-[#6B6B6B] mt-0.5">{img.category} · #{img.order}</p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
              <button onClick={() => setEditing(img)} className="bg-[#0A0A0A]/80 text-[#C9A84C] text-[10px] px-2 py-1 hover:bg-[#0A0A0A]">Edit</button>
              <button onClick={() => handleDelete(img.id)} className="bg-[#0A0A0A]/80 text-red-400/70 text-[10px] px-2 py-1 hover:text-red-400 hover:bg-[#0A0A0A]">Del</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-full text-[#6B6B6B] text-sm bg-[#111111] border border-[#C9A84C]/10 p-8 text-center">No images yet. Add some to the gallery.</p>}
      </div>
    </div>
  );
}
