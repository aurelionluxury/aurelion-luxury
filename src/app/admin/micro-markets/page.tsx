"use client";

import { useEffect, useState } from "react";
import { Field, Input, Textarea, Select } from "@/components/admin/AdminFormField";

interface MicroMarket {
  id: number;
  name: string;
  slug: string;
  zone: string;
  description: string | null;
  avgPrice: number | null;
  priceRange: string | null;
  connectivity: string | null;
  landmarks: string | null;
}

const empty = (): Omit<MicroMarket, "id"> => ({
  name: "", slug: "", zone: "central", description: "",
  avgPrice: null, priceRange: "", connectivity: "", landmarks: "",
});

const ZONES = ["south", "central", "western", "eastern", "north", "suburbs"];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function MicroMarketsPage() {
  const [items, setItems] = useState<MicroMarket[]>([]);
  const [editing, setEditing] = useState<Partial<MicroMarket> | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/micro-markets");
    setItems(await r.json());
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const isEdit = "id" in editing;
    await fetch(isEdit ? `/api/admin/micro-markets/${editing.id}` : "/api/admin/micro-markets", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    setSaving(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this micro-market?")) return;
    await fetch(`/api/admin/micro-markets/${id}`, { method: "DELETE" });
    load();
  }

  const set = (key: string, value: string | number | null) =>
    setEditing((e) => e ? { ...e, [key]: value } : e);

  const grouped = ZONES.reduce<Record<string, MicroMarket[]>>((acc, z) => {
    acc[z] = items.filter(m => m.zone === z);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">Micro-Markets</h1>
          <p className="text-xs text-[#6B6B6B] mt-1">Mumbai locality guides (Bandra, Powai, Worli, etc.)</p>
        </div>
        <button onClick={() => setEditing(empty())} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium">+ New</button>
      </div>

      {editing && (
        <div className="bg-[#111111] border border-[#C9A84C]/20 p-6 mb-6 space-y-4">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C]">{"id" in editing ? "Edit Micro-Market" : "New Micro-Market"}</h2>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Name" required>
              <Input
                value={editing.name ?? ""}
                onChange={(e) => { set("name", e.target.value); if (!("id" in editing)) set("slug", slugify(e.target.value)); }}
                placeholder="Bandra West"
              />
            </Field>
            <Field label="Slug">
              <Input value={editing.slug ?? ""} onChange={(e) => set("slug", e.target.value)} />
            </Field>
            <Field label="Zone">
              <Select value={editing.zone ?? "central"} onChange={(e) => set("zone", e.target.value)}>
                {ZONES.map(z => <option key={z} value={z}>{z.charAt(0).toUpperCase() + z.slice(1)}</option>)}
              </Select>
            </Field>
          </div>
          <Field label="Description" hint="Short paragraph for listing pages">
            <Textarea value={editing.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={2} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Avg Price (₹ Cr)" hint="Numeric, e.g. 4.5">
              <Input
                type="number"
                step="0.1"
                value={editing.avgPrice !== null && editing.avgPrice !== undefined ? String(editing.avgPrice) : ""}
                onChange={(e) => set("avgPrice", e.target.value ? parseFloat(e.target.value) : null)}
                placeholder="4.5"
              />
            </Field>
            <Field label="Price Range" hint="Display text, e.g. ₹2.5Cr–₹15Cr">
              <Input value={editing.priceRange ?? ""} onChange={(e) => set("priceRange", e.target.value)} placeholder="₹2.5Cr–₹15Cr" />
            </Field>
          </div>
          <Field label="Connectivity" hint="Key transport links">
            <Input value={editing.connectivity ?? ""} onChange={(e) => set("connectivity", e.target.value)} placeholder="Western Line · BKC Metro · JVLR" />
          </Field>
          <Field label="Landmarks" hint="Comma-separated key landmarks">
            <Input value={editing.landmarks ?? ""} onChange={(e) => set("landmarks", e.target.value)} placeholder="Bandra Fort, Linking Road, Bandstand" />
          </Field>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
            <button onClick={() => setEditing(null)} className="border border-[#C9A84C]/20 text-[#6B6B6B] text-xs tracking-widest uppercase px-5 py-2.5 hover:border-[#C9A84C]/40 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {ZONES.map(zone => (
          grouped[zone].length > 0 && (
            <div key={zone}>
              <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-3">{zone.charAt(0).toUpperCase() + zone.slice(1)} Mumbai</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {grouped[zone].map((m) => (
                  <div key={m.id} className="bg-[#111111] border border-[#C9A84C]/10 p-5 flex gap-3 items-start">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#FFFAEC] mb-1">{m.name}</p>
                      {m.priceRange && <p className="text-xs text-[#C9A84C]">{m.priceRange}</p>}
                      {m.connectivity && <p className="text-xs text-[#6B6B6B] mt-1 truncate">{m.connectivity}</p>}
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button onClick={() => setEditing(m)} className="text-[#C9A84C] text-xs hover:underline">Edit</button>
                      <button onClick={() => handleDelete(m.id)} className="text-red-400/70 text-xs hover:text-red-400">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
        {items.length === 0 && <p className="text-[#6B6B6B] text-sm bg-[#111111] border border-[#C9A84C]/10 p-8 text-center">No micro-markets yet.</p>}
      </div>
    </div>
  );
}
