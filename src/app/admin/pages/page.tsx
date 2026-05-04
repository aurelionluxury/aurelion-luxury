"use client";

import { useEffect, useState } from "react";
import { Field, Input, Checkbox } from "@/components/admin/AdminFormField";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploader from "@/components/admin/ImageUploader";

interface Page {
  id: number;
  slug: string;
  title: string;
  metaTitle: string | null;
  metaDesc: string | null;
  content: string | null;
  isPublished: boolean;
}

const SYSTEM_PAGES = [
  { slug: "about", title: "About Us" },
  { slug: "brokerage", title: "Our Brokerage Model" },
  { slug: "contact", title: "Contact" },
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "terms", title: "Terms & Conditions" },
];

export default function PagesPage() {
  const [items, setItems] = useState<Page[]>([]);
  const [editing, setEditing] = useState<Partial<Page> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  // About page founder image (stored in SiteSetting)
  const [founderImage, setFounderImage] = useState("");
  const [imgSaving, setImgSaving] = useState(false);
  const [imgSaved, setImgSaved] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/pages");
    setItems(await r.json());
  }
  async function loadFounderImage() {
    const r = await fetch("/api/admin/settings");
    if (r.ok) {
      const all: { key: string; value: string }[] = await r.json();
      const found = all.find(s => s.key === "about_founder_image");
      if (found) setFounderImage(found.value);
    }
  }

  useEffect(() => { load(); loadFounderImage(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const isEdit = "id" in editing;
    await fetch(isEdit ? `/api/admin/pages/${editing.id}` : "/api/admin/pages", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    load();
  }

  async function saveFounderImage() {
    setImgSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "about_founder_image", value: founderImage }),
    });
    setImgSaving(false);
    setImgSaved(true);
    setTimeout(() => setImgSaved(false), 2500);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this page?")) return;
    await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
    load();
  }

  const set = (key: string, value: string | boolean) =>
    setEditing((e) => e ? { ...e, [key]: value } : e);

  function startNew(preset?: { slug: string; title: string }) {
    setEditing({
      slug: preset?.slug ?? "",
      title: preset?.title ?? "",
      metaTitle: "",
      metaDesc: "",
      content: "",
      isPublished: true,
    });
  }

  const existingSlugs = new Set(items.map(p => p.slug));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">Pages</h1>
          <p className="text-xs text-[#6B6B6B] mt-1">Static content pages (About, Privacy Policy, etc.)</p>
        </div>
        <div className="flex items-center gap-4">
          {saved && <span className="text-emerald-400 text-xs tracking-widest uppercase">✓ Saved</span>}
          <button onClick={() => startNew()} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium">+ New Page</button>
        </div>
      </div>

      {/* About Us — Founder Image */}
      <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 mb-6">
        <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-4">About Us — Founder Photo</h2>
        <p className="text-xs text-[#6B6B6B] mb-4">Upload a founder/team photo. If uploaded, it replaces the gold monogram on the About Us page.</p>
        <ImageUploader
          value={founderImage}
          onChange={(url) => setFounderImage(url.split(",")[0]?.trim() ?? "")}
          label="Founder Photo"
        />
        <div className="flex items-center gap-3 mt-4">
          <button onClick={saveFounderImage} disabled={imgSaving} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50">
            {imgSaving ? "Saving…" : "Save Photo"}
          </button>
          {imgSaved && <span className="text-emerald-400 text-xs tracking-widest uppercase">✓ Saved</span>}
        </div>
      </div>

      {/* Quick-create system pages */}
      {SYSTEM_PAGES.some(p => !existingSlugs.has(p.slug)) && (
        <div className="bg-[#111111] border border-[#C9A84C]/10 p-4 mb-6">
          <p className="text-xs text-[#6B6B6B] mb-3 tracking-wide">Quick-create system pages:</p>
          <div className="flex flex-wrap gap-2">
            {SYSTEM_PAGES.filter(p => !existingSlugs.has(p.slug)).map(p => (
              <button
                key={p.slug}
                onClick={() => startNew(p)}
                className="text-[10px] tracking-widest uppercase border border-[#C9A84C]/20 text-[#C9A84C] px-3 py-1.5 hover:border-[#C9A84C]/50 transition-colors"
              >
                + {p.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {editing && (
        <div className="bg-[#111111] border border-[#C9A84C]/20 p-6 mb-6 space-y-4">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C]">{"id" in editing ? `Edit: ${editing.title}` : "New Page"}</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title" required>
              <Input value={editing.title ?? ""} onChange={(e) => set("title", e.target.value)} />
            </Field>
            <Field label="Slug" hint="URL path, e.g. about">
              <Input value={editing.slug ?? ""} onChange={(e) => set("slug", e.target.value)} disabled={"id" in editing} required />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Meta Title" hint="Defaults to title if empty">
              <Input value={editing.metaTitle ?? ""} onChange={(e) => set("metaTitle", e.target.value)} />
            </Field>
            <Field label="Meta Description" hint="150–160 characters">
              <Input value={editing.metaDesc ?? ""} onChange={(e) => set("metaDesc", e.target.value)} />
            </Field>
          </div>
          <Field label="Content">
            <RichTextEditor value={editing.content ?? ""} onChange={(v) => set("content", v)} />
          </Field>
          <Checkbox label="Published (visible on website)" checked={editing.isPublished ?? true} onChange={(e) => set("isPublished", e.target.checked)} />
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
            <button onClick={() => setEditing(null)} className="border border-[#C9A84C]/20 text-[#6B6B6B] text-xs tracking-widest uppercase px-5 py-2.5 hover:border-[#C9A84C]/40 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.map((page) => (
          <div key={page.id} className="bg-[#111111] border border-[#C9A84C]/10 p-5 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-[#FFFAEC]">{page.title}</p>
                <span className="text-xs text-[#6B6B6B] font-mono">/{page.slug}</span>
                {!page.isPublished && <span className="text-[10px] border border-red-400/20 text-red-400/70 px-2 py-0.5 tracking-widest uppercase">Draft</span>}
              </div>
              {page.metaDesc && <p className="text-xs text-[#6B6B6B] mt-1 line-clamp-1">{page.metaDesc}</p>}
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => setEditing(page)} className="text-[#C9A84C] text-xs hover:underline">Edit</button>
              <button onClick={() => handleDelete(page.id)} className="text-red-400/70 text-xs hover:text-red-400">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-[#6B6B6B] text-sm bg-[#111111] border border-[#C9A84C]/10 p-8 text-center">No pages yet.</p>}
      </div>
    </div>
  );
}
