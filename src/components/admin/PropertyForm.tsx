"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea, Select, Checkbox } from "./AdminFormField";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";

interface PropertyFormProps {
  initial?: Record<string, unknown>;
  isEdit?: boolean;
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function PropertyForm({ initial, isEdit }: PropertyFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: String(initial?.title ?? ""),
    slug: String(initial?.slug ?? ""),
    description: String(initial?.description ?? ""),
    location: String(initial?.location ?? ""),
    area: String(initial?.area ?? ""),
    type: String(initial?.type ?? "apartment"),
    status: String(initial?.status ?? "available"),
    price: String(initial?.price ?? ""),
    priceLabel: String(initial?.priceLabel ?? ""),
    bedrooms: String(initial?.bedrooms ?? ""),
    bathrooms: String(initial?.bathrooms ?? ""),
    carpetArea: String(initial?.carpetArea ?? ""),
    builtUpArea: String(initial?.builtUpArea ?? ""),
    floor: String(initial?.floor ?? ""),
    totalFloors: String(initial?.totalFloors ?? ""),
    facing: String(initial?.facing ?? ""),
    amenities: String(initial?.amenities ?? ""),
    images: String(initial?.images ?? ""),
    featured: Boolean(initial?.featured),
    published: initial?.published !== false,
    developerName: String(initial?.developerName ?? ""),
    reraNumber: String(initial?.reraNumber ?? ""),
    possession: String(initial?.possession ?? ""),
    typology: String(initial?.typology ?? ""),
    config: String(initial?.config ?? ""),
  });

  const set = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `/api/admin/properties/${initial?.id}`
      : "/api/admin/properties";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/properties");
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
        <button onClick={() => router.back()} className="text-[#6B6B6B] hover:text-[#C9A84C] text-xs tracking-widest uppercase">
          ← Back
        </button>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">
          {isEdit ? "Edit Property" : "New Property"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-5">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-2">Basic Info</h2>

          <Field label="Title" required>
            <Input value={form.title} onChange={(e) => { set("title", e.target.value); if (!isEdit) set("slug", slugify(e.target.value)); }} required />
          </Field>
          <Field label="Slug" hint="URL-friendly identifier">
            <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
          </Field>
          <Field label="Description">
            <RichTextEditor value={form.description} onChange={(v) => set("description", v)} height={320} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Location" required>
              <Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Worli, Mumbai" required />
            </Field>
            <Field label="Area/Neighbourhood">
              <Input value={form.area} onChange={(e) => set("area", e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Type">
              <Select value={form.type} onChange={(e) => set("type", e.target.value)}>
                {["apartment", "villa", "penthouse", "duplex", "commercial", "plot"].map(t => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </Select>
            </Field>
            <Field label="Status">
              <Select value={form.status} onChange={(e) => set("status", e.target.value)}>
                {["new_launch", "under_construction", "ready_to_move", "available", "sold"].map(s => (
                  <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                ))}
              </Select>
            </Field>
            <Field label="Developer Name">
              <Input value={form.developerName} onChange={(e) => set("developerName", e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Typology" hint="E.g. Ultra-Luxury Residences">
              <Input value={form.typology} onChange={(e) => set("typology", e.target.value)} placeholder="Sea-Facing Residences" />
            </Field>
            <Field label="Configuration" hint="E.g. 3 &amp; 4 BHK">
              <Input value={form.config} onChange={(e) => set("config", e.target.value)} placeholder="2, 3 &amp; 4 BHK" />
            </Field>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-5">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-2">Pricing</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (in Crores)" required hint="E.g. 5.5 for ₹5.5 Cr">
              <Input type="number" step="0.01" value={form.price} onChange={(e) => set("price", e.target.value)} required />
            </Field>
            <Field label="Price Label" hint="E.g. Starting from ₹5.5 Cr">
              <Input value={form.priceLabel} onChange={(e) => set("priceLabel", e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Possession">
              <Input value={form.possession} onChange={(e) => set("possession", e.target.value)} placeholder="Dec 2027" />
            </Field>
            <Field label="RERA Number">
              <Input value={form.reraNumber} onChange={(e) => set("reraNumber", e.target.value)} />
            </Field>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-5">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-2">Details</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              ["Bedrooms", "bedrooms"],
              ["Bathrooms", "bathrooms"],
              ["Carpet Area (sqft)", "carpetArea"],
              ["Built-Up Area (sqft)", "builtUpArea"],
            ].map(([label, key]) => (
              <Field key={key} label={label}>
                <Input type="number" value={form[key as keyof typeof form] as string} onChange={(e) => set(key, e.target.value)} />
              </Field>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Floor">
              <Input type="number" value={form.floor} onChange={(e) => set("floor", e.target.value)} />
            </Field>
            <Field label="Total Floors">
              <Input type="number" value={form.totalFloors} onChange={(e) => set("totalFloors", e.target.value)} />
            </Field>
          </div>
          <Field label="Facing">
            <Select value={form.facing} onChange={(e) => set("facing", e.target.value)}>
              <option value="">Select facing</option>
              {["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West", "Sea-Facing"].map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </Select>
          </Field>
          <Field label="Amenities" hint="Comma-separated list">
            <Textarea value={form.amenities} onChange={(e) => set("amenities", e.target.value)} rows={2} placeholder="Swimming Pool, Gym, Concierge..." />
          </Field>
        </div>

        <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-5">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-2">Images</h2>
          <ImageUploader
            value={form.images}
            onChange={(urls) => set("images", urls)}
          />
        </div>

        <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-4">
          <Checkbox label="Featured property (shown on homepage)" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
          <Checkbox label="Published (visible on website)" checked={form.published as boolean} onChange={(e) => set("published", e.target.checked)} />
        </div>

        {error && <p className="text-red-400 text-xs border border-red-400/20 bg-red-400/5 px-3 py-2">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50">
            {saving ? "Saving…" : isEdit ? "Update Property" : "Create Property"}
          </button>
          <button type="button" onClick={() => router.back()} className="border border-[#C9A84C]/20 text-[#6B6B6B] text-xs tracking-widest uppercase px-6 py-3 hover:border-[#C9A84C]/40 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
