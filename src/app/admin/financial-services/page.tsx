"use client";

import { useEffect, useState } from "react";
import { Field, Input, Textarea, Select, Checkbox } from "@/components/admin/AdminFormField";

interface FinancialService {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string | null;
  content: string | null;
  icon: string | null;
  features: string | null;
  partners: string | null;
  isActive: boolean;
}

const empty = (): Omit<FinancialService, "id"> => ({
  title: "", slug: "", category: "loans", description: "", content: "",
  icon: "", features: "", partners: "", isActive: true,
});

const CATEGORIES = ["loans", "insurance", "investment", "tax_planning", "other"];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function FinancialServicesPage() {
  const [items, setItems] = useState<FinancialService[]>([]);
  const [editing, setEditing] = useState<Partial<FinancialService> | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/financial-services");
    setItems(await r.json());
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const isEdit = "id" in editing;
    await fetch(isEdit ? `/api/admin/financial-services/${editing.id}` : "/api/admin/financial-services", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    setSaving(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/admin/financial-services/${id}`, { method: "DELETE" });
    load();
  }

  const set = (key: string, value: string | boolean) =>
    setEditing((e) => e ? { ...e, [key]: value } : e);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">Financial Services</h1>
        <button onClick={() => setEditing(empty())} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium">+ New</button>
      </div>

      {editing && (
        <div className="bg-[#111111] border border-[#C9A84C]/20 p-6 mb-6 space-y-4">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C]">{"id" in editing ? "Edit Service" : "New Service"}</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title" required>
              <Input
                value={editing.title ?? ""}
                onChange={(e) => { set("title", e.target.value); if (!("id" in editing)) set("slug", slugify(e.target.value)); }}
              />
            </Field>
            <Field label="Slug">
              <Input value={editing.slug ?? ""} onChange={(e) => set("slug", e.target.value)} required />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <Select value={editing.category ?? "loans"} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</option>)}
              </Select>
            </Field>
            <Field label="Icon" hint="Emoji or icon name, e.g. 🏠">
              <Input value={editing.icon ?? ""} onChange={(e) => set("icon", e.target.value)} placeholder="🏠" />
            </Field>
          </div>
          <Field label="Description" hint="Short summary shown in listings">
            <Textarea value={editing.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={2} />
          </Field>
          <Field label="Features" hint="Comma-separated list of features">
            <Textarea value={editing.features ?? ""} onChange={(e) => set("features", e.target.value)} rows={2} placeholder="Home Loan up to ₹10Cr, Competitive rates, Quick approval" />
          </Field>
          <Field label="Partner Banks / Institutions" hint="Comma-separated">
            <Input value={editing.partners ?? ""} onChange={(e) => set("partners", e.target.value)} placeholder="HDFC, SBI, ICICI, Kotak" />
          </Field>
          <Checkbox label="Active (visible on website)" checked={editing.isActive ?? true} onChange={(e) => set("isActive", e.target.checked)} />
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
            <button onClick={() => setEditing(null)} className="border border-[#C9A84C]/20 text-[#6B6B6B] text-xs tracking-widest uppercase px-5 py-2.5 hover:border-[#C9A84C]/40 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((svc) => (
          <div key={svc.id} className="bg-[#111111] border border-[#C9A84C]/10 p-5 flex gap-4 items-start">
            {svc.icon && <span className="text-2xl shrink-0">{svc.icon}</span>}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-sm font-medium text-[#FFFAEC]">{svc.title}</p>
                <span className="text-[10px] border border-[#C9A84C]/20 text-[#6B6B6B] px-2 py-0.5 tracking-widest uppercase">{svc.category}</span>
                {!svc.isActive && <span className="text-[10px] border border-red-400/20 text-red-400/70 px-2 py-0.5 tracking-widest uppercase">Inactive</span>}
              </div>
              {svc.description && <p className="text-xs text-[#A8A8A8] line-clamp-1">{svc.description}</p>}
              {svc.partners && <p className="text-xs text-[#6B6B6B] mt-1">Partners: {svc.partners}</p>}
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => setEditing(svc)} className="text-[#C9A84C] text-xs hover:underline">Edit</button>
              <button onClick={() => handleDelete(svc.id)} className="text-red-400/70 text-xs hover:text-red-400">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-[#6B6B6B] text-sm bg-[#111111] border border-[#C9A84C]/10 p-8 text-center">No financial services yet.</p>}
      </div>
    </div>
  );
}
