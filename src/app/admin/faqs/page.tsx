"use client";

import { useEffect, useState } from "react";
import { Field, Input, Textarea, Select } from "@/components/admin/AdminFormField";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

const empty = (): Omit<FAQ, "id"> => ({
  question: "", answer: "", category: "general", order: 0, isActive: true,
});

const CATEGORIES = ["general", "real_estate", "automobiles", "financial", "process"];

export default function FAQsPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [editing, setEditing] = useState<Partial<FAQ> | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/faqs");
    setItems(await r.json());
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const isEdit = "id" in editing;
    await fetch(isEdit ? `/api/admin/faqs/${editing.id}` : "/api/admin/faqs", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    setSaving(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this FAQ?")) return;
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    load();
  }

  const set = (key: string, value: string | number | boolean) =>
    setEditing((e) => e ? { ...e, [key]: value } : e);

  const grouped = CATEGORIES.reduce<Record<string, FAQ[]>>((acc, cat) => {
    acc[cat] = items.filter(f => f.category === cat);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">FAQs</h1>
        <button onClick={() => setEditing(empty())} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium">+ New</button>
      </div>

      {editing && (
        <div className="bg-[#111111] border border-[#C9A84C]/20 p-6 mb-6 space-y-4">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C]">{"id" in editing ? "Edit FAQ" : "New FAQ"}</h2>
          <Field label="Question" required>
            <Input value={editing.question ?? ""} onChange={(e) => set("question", e.target.value)} />
          </Field>
          <Field label="Answer" required>
            <Textarea value={editing.answer ?? ""} onChange={(e) => set("answer", e.target.value)} rows={4} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <Select value={editing.category ?? "general"} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</option>)}
              </Select>
            </Field>
            <Field label="Order" hint="Lower = appears first">
              <Input type="number" value={String(editing.order ?? 0)} onChange={(e) => set("order", parseInt(e.target.value) || 0)} />
            </Field>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
            <button onClick={() => setEditing(null)} className="border border-[#C9A84C]/20 text-[#6B6B6B] text-xs tracking-widest uppercase px-5 py-2.5 hover:border-[#C9A84C]/40 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {CATEGORIES.map(cat => (
          grouped[cat].length > 0 && (
            <div key={cat}>
              <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-3">{cat.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</h2>
              <div className="space-y-2">
                {grouped[cat].map((f) => (
                  <div key={f.id} className="bg-[#111111] border border-[#C9A84C]/10 p-5 flex gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#FFFAEC] mb-1 font-medium">{f.question}</p>
                      <p className="text-xs text-[#A8A8A8] leading-relaxed line-clamp-2">{f.answer}</p>
                      <span className="inline-block mt-2 text-[10px] border border-[#C9A84C]/20 text-[#6B6B6B] px-2 py-0.5 tracking-widest uppercase">Order: {f.order}</span>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button onClick={() => setEditing(f)} className="text-[#C9A84C] text-xs hover:underline">Edit</button>
                      <button onClick={() => handleDelete(f.id)} className="text-red-400/70 text-xs hover:text-red-400">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
        {items.length === 0 && <p className="text-[#6B6B6B] text-sm bg-[#111111] border border-[#C9A84C]/10 p-8 text-center">No FAQs yet.</p>}
      </div>
    </div>
  );
}
