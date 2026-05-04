"use client";

import { useEffect, useState } from "react";
import { Field, Input, Textarea, Select } from "@/components/admin/AdminFormField";

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  company: string;
  content: string;
  rating: number;
  category: string;
  isActive: boolean;
}

const empty = (): Omit<Testimonial, "id"> => ({
  name: "", designation: "", company: "", content: "",
  rating: 5, category: "real_estate", isActive: true,
});

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/testimonials");
    setItems(await r.json());
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const isEdit = "id" in editing;
    await fetch(isEdit ? `/api/admin/testimonials/${editing.id}` : "/api/admin/testimonials", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    setSaving(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    load();
  }

  const set = (key: string, value: string | number | boolean) =>
    setEditing((e) => e ? { ...e, [key]: value } : e);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">Testimonials</h1>
        <button onClick={() => setEditing(empty())} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium">+ New</button>
      </div>

      {/* Form */}
      {editing && (
        <div className="bg-[#111111] border border-[#C9A84C]/20 p-6 mb-6 space-y-4">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C]">{"id" in editing ? "Edit Testimonial" : "New Testimonial"}</h2>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Identifier / Role"><Input value={editing.name ?? ""} onChange={(e) => set("name", e.target.value)} placeholder="Senior Executive, Finance" /></Field>
            <Field label="Designation"><Input value={editing.designation ?? ""} onChange={(e) => set("designation", e.target.value)} /></Field>
            <Field label="Company / Location"><Input value={editing.company ?? ""} onChange={(e) => set("company", e.target.value)} placeholder="South Mumbai" /></Field>
          </div>
          <Field label="Content" required><Textarea value={editing.content ?? ""} onChange={(e) => set("content", e.target.value)} rows={3} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <Select value={editing.category ?? "real_estate"} onChange={(e) => set("category", e.target.value)}>
                {["real_estate", "automobiles", "financial", "general"].map(c => <option key={c} value={c}>{c.replace(/_/g, " ")}</option>)}
              </Select>
            </Field>
            <Field label="Rating">
              <Select value={String(editing.rating ?? 5)} onChange={(e) => set("rating", parseInt(e.target.value))}>
                {[5, 4, 3].map(n => <option key={n} value={n}>{n} Stars</option>)}
              </Select>
            </Field>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
            <button onClick={() => setEditing(null)} className="border border-[#C9A84C]/20 text-[#6B6B6B] text-xs tracking-widest uppercase px-5 py-2.5 hover:border-[#C9A84C]/40 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="bg-[#111111] border border-[#C9A84C]/10 p-5 flex gap-4 items-start">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#FFFAEC] mb-1">&ldquo;{t.content}&rdquo;</p>
              <p className="text-xs text-[#C9A84C]">{t.name} · {t.company}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-[10px] border border-[#C9A84C]/20 text-[#6B6B6B] px-2 py-0.5 tracking-widest uppercase">{t.category}</span>
                <span className="text-[#C9A84C] text-xs">{"★".repeat(t.rating)}</span>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => setEditing(t)} className="text-[#C9A84C] text-xs hover:underline">Edit</button>
              <button onClick={() => handleDelete(t.id)} className="text-red-400/70 text-xs hover:text-red-400">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-[#6B6B6B] text-sm bg-[#111111] border border-[#C9A84C]/10 p-8 text-center">No testimonials yet.</p>}
      </div>
    </div>
  );
}
