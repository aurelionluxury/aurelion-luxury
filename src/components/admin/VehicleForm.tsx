"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea, Select, Checkbox } from "./AdminFormField";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";

interface VehicleFormProps {
  initial?: Record<string, unknown>;
  isEdit?: boolean;
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function VehicleForm({ initial, isEdit }: VehicleFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: String(initial?.title ?? ""),
    slug: String(initial?.slug ?? ""),
    description: String(initial?.description ?? ""),
    make: String(initial?.make ?? ""),
    model: String(initial?.model ?? ""),
    year: String(initial?.year ?? new Date().getFullYear()),
    variant: String(initial?.variant ?? ""),
    type: String(initial?.type ?? "sedan"),
    condition: String(initial?.condition ?? "new"),
    status: String(initial?.status ?? "available"),
    price: String(initial?.price ?? ""),
    priceLabel: String(initial?.priceLabel ?? ""),
    mileage: String(initial?.mileage ?? ""),
    fuel: String(initial?.fuel ?? "Petrol"),
    transmission: String(initial?.transmission ?? "Automatic"),
    color: String(initial?.color ?? ""),
    interiorColor: String(initial?.interiorColor ?? ""),
    engine: String(initial?.engine ?? ""),
    power: String(initial?.power ?? ""),
    features: String(initial?.features ?? ""),
    images: String(initial?.images ?? ""),
    featured: Boolean(initial?.featured),
  });

  const set = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/admin/vehicles/${initial?.id}` : "/api/admin/vehicles";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/vehicles");
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
          {isEdit ? "Edit Vehicle" : "New Vehicle"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-5">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-2">Basic Info</h2>
          <Field label="Title" required hint="E.g. Mercedes-Benz S-Class">
            <Input value={form.title} onChange={(e) => { set("title", e.target.value); if (!isEdit) set("slug", slugify(e.target.value)); }} required />
          </Field>
          <Field label="Slug">
            <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Make" required><Input value={form.make} onChange={(e) => set("make", e.target.value)} placeholder="Mercedes-Benz" required /></Field>
            <Field label="Model" required><Input value={form.model} onChange={(e) => set("model", e.target.value)} placeholder="S-Class" required /></Field>
            <Field label="Year" required><Input type="number" value={form.year} onChange={(e) => set("year", e.target.value)} required /></Field>
          </div>
          <Field label="Variant"><Input value={form.variant} onChange={(e) => set("variant", e.target.value)} placeholder="S 500 4MATIC" /></Field>
          <Field label="Description"><RichTextEditor value={form.description} onChange={(v) => set("description", v)} height={300} /></Field>
        </div>

        <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-5">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-2">Specs</h2>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Type">
              <Select value={form.type} onChange={(e) => set("type", e.target.value)}>
                {["sedan", "suv", "coupe", "convertible", "hatchback", "van", "truck"].map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
              </Select>
            </Field>
            <Field label="Condition">
              <Select value={form.condition} onChange={(e) => set("condition", e.target.value)}>
                <option value="new">New</option>
                <option value="pre_owned">Pre-Owned</option>
                <option value="certified">Certified Pre-Owned</option>
              </Select>
            </Field>
            <Field label="Status">
              <Select value={form.status} onChange={(e) => set("status", e.target.value)}>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="reserved">Reserved</option>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Fuel">
              <Select value={form.fuel} onChange={(e) => set("fuel", e.target.value)}>
                {["Petrol", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"].map(f => <option key={f}>{f}</option>)}
              </Select>
            </Field>
            <Field label="Transmission">
              <Select value={form.transmission} onChange={(e) => set("transmission", e.target.value)}>
                {["Automatic", "Manual", "CVT", "DCT"].map(t => <option key={t}>{t}</option>)}
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Engine"><Input value={form.engine} onChange={(e) => set("engine", e.target.value)} placeholder="4.0L Twin-Turbo V8" /></Field>
            <Field label="Power"><Input value={form.power} onChange={(e) => set("power", e.target.value)} placeholder="469 bhp" /></Field>
          </div>
          <Field label="Mileage (km)" hint="For pre-owned vehicles">
            <Input type="number" value={form.mileage} onChange={(e) => set("mileage", e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Exterior Colour"><Input value={form.color} onChange={(e) => set("color", e.target.value)} placeholder="Obsidian Black" /></Field>
            <Field label="Interior Colour"><Input value={form.interiorColor} onChange={(e) => set("interiorColor", e.target.value)} placeholder="Nappa Leather Beige" /></Field>
          </div>
          <Field label="Features" hint="Comma-separated">
            <Textarea value={form.features} onChange={(e) => set("features", e.target.value)} rows={2} placeholder="Burmester Sound System, Night Vision, Massage Seats..." />
          </Field>
        </div>

        <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-5">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-2">Pricing</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (Crores)" required hint="E.g. 2.15 for ₹2.15 Cr">
              <Input type="number" step="0.01" value={form.price} onChange={(e) => set("price", e.target.value)} required />
            </Field>
            <Field label="Price Label" hint="Shown on card">
              <Input value={form.priceLabel} onChange={(e) => set("priceLabel", e.target.value)} placeholder="Indicative Price" />
            </Field>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-3">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-2">Images</h2>
          <ImageUploader value={form.images} onChange={(urls) => set("images", urls)} />
        </div>

        <div className="bg-[#111111] border border-[#C9A84C]/10 p-6">
          <Checkbox label="Featured vehicle (shown on homepage)" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
        </div>

        {error && <p className="text-red-400 text-xs border border-red-400/20 bg-red-400/5 px-3 py-2">{error}</p>}
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50">
            {saving ? "Saving…" : isEdit ? "Update Vehicle" : "Create Vehicle"}
          </button>
          <button type="button" onClick={() => router.back()} className="border border-[#C9A84C]/20 text-[#6B6B6B] text-xs tracking-widest uppercase px-6 py-3 hover:border-[#C9A84C]/40 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
}
