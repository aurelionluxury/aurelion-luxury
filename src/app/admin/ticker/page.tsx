"use client";

import { useEffect, useState } from "react";
import { Field, Input, Select } from "@/components/admin/AdminFormField";

interface Ticker {
  id: number;
  label: string;
  value: string;
  change: string | null;
  trend: string | null;
  category: string | null;
  order: number;
  isActive: boolean;
}

const empty = (): Omit<Ticker, "id"> => ({
  label: "", value: "", change: "", trend: "up", category: "real_estate", order: 0, isActive: true,
});

export default function TickerPage() {
  const [items, setItems] = useState<Ticker[]>([]);
  const [editing, setEditing] = useState<Partial<Ticker> | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/ticker");
    setItems(await r.json());
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const isEdit = "id" in editing;
    await fetch(isEdit ? `/api/admin/ticker/${editing.id}` : "/api/admin/ticker", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    setSaving(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this ticker item?")) return;
    await fetch(`/api/admin/ticker/${id}`, { method: "DELETE" });
    load();
  }

  const set = (key: string, value: string | number | boolean) =>
    setEditing((e) => e ? { ...e, [key]: value } : e);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">Market Ticker</h1>
          <p className="text-xs text-[#6B6B6B] mt-1">Items shown in the scrolling ticker at the top of the site</p>
        </div>
        <button onClick={() => setEditing(empty())} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium">+ New</button>
      </div>

      {editing && (
        <div className="bg-[#111111] border border-[#C9A84C]/20 p-6 mb-6 space-y-4">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C]">{"id" in editing ? "Edit Ticker Item" : "New Ticker Item"}</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Label" hint="e.g. Bandra Worli Sea Link Area">
              <Input value={editing.label ?? ""} onChange={(e) => set("label", e.target.value)} placeholder="Powai Lake View" />
            </Field>
            <Field label="Value" hint="e.g. ₹3.2Cr–₹8.5Cr">
              <Input value={editing.value ?? ""} onChange={(e) => set("value", e.target.value)} placeholder="₹3.2Cr–₹8.5Cr" />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Change" hint="e.g. +12.4%">
              <Input value={editing.change ?? ""} onChange={(e) => set("change", e.target.value)} placeholder="+12.4%" />
            </Field>
            <Field label="Trend">
              <Select value={editing.trend ?? "up"} onChange={(e) => set("trend", e.target.value)}>
                <option value="up">↑ Up</option>
                <option value="down">↓ Down</option>
                <option value="neutral">— Neutral</option>
              </Select>
            </Field>
            <Field label="Category">
              <Select value={editing.category ?? "real_estate"} onChange={(e) => set("category", e.target.value)}>
                {["real_estate", "automobiles", "financial", "general"].map(c => (
                  <option key={c} value={c}>{c.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</option>
                ))}
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
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

      <div className="space-y-2">
        {items.map((t) => (
          <div key={t.id} className="bg-[#111111] border border-[#C9A84C]/10 p-4 flex items-center gap-4">
            <span className="text-[#6B6B6B] text-xs w-8 text-center shrink-0">{t.order}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs text-[#A8A8A8]">{t.label}</span>
                <span className="text-sm font-medium text-[#FFFAEC]">{t.value}</span>
                {t.change && (
                  <span className={`text-xs font-medium ${t.trend === "up" ? "text-green-400" : t.trend === "down" ? "text-red-400" : "text-[#6B6B6B]"}`}>
                    {t.trend === "up" ? "↑" : t.trend === "down" ? "↓" : "—"} {t.change}
                  </span>
                )}
                {t.category && <span className="text-[10px] border border-[#C9A84C]/20 text-[#6B6B6B] px-2 py-0.5 tracking-widest uppercase">{t.category}</span>}
                {!t.isActive && <span className="text-[10px] border border-red-400/20 text-red-400/70 px-2 py-0.5 tracking-widest uppercase">Inactive</span>}
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => setEditing(t)} className="text-[#C9A84C] text-xs hover:underline">Edit</button>
              <button onClick={() => handleDelete(t.id)} className="text-red-400/70 text-xs hover:text-red-400">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-[#6B6B6B] text-sm bg-[#111111] border border-[#C9A84C]/10 p-8 text-center">No ticker items yet.</p>}
      </div>
    </div>
  );
}
