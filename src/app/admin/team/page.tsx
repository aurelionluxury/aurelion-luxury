"use client";

import { useEffect, useState } from "react";
import { Field, Input, Textarea, Checkbox } from "@/components/admin/AdminFormField";
import ImageUploader from "@/components/admin/ImageUploader";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  image: string | null;
  email: string | null;
  linkedin: string | null;
  phone: string | null;
  order: number;
  published: boolean;
}

const blank = (): Partial<TeamMember> => ({
  name: "", title: "", bio: "", image: "", email: "", linkedin: "", phone: "", order: 0, published: true,
});

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<Partial<TeamMember> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/team");
    if (r.ok) setMembers(await r.json());
  }
  useEffect(() => { load(); }, []);

  const set = (key: string, value: string | boolean | number) =>
    setEditing((e) => e ? { ...e, [key]: value } : e);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const isEdit = "id" in editing && editing.id;
    const res = await fetch(isEdit ? `/api/admin/team/${editing.id}` : "/api/admin/team", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      setEditing(null);
      load();
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">Team Members</h1>
          <p className="text-xs text-[#6B6B6B] mt-1">Manage team members shown on the /team and /about pages</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-emerald-400 text-xs tracking-widest uppercase">✓ Saved</span>}
          {!editing && (
            <button onClick={() => setEditing(blank())} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium">
              + Add Member
            </button>
          )}
        </div>
      </div>

      {editing && (
        <div className="bg-[#111111] border border-[#C9A84C]/20 p-6 mb-6 space-y-4">
          <h2 className="text-xs tracking-widest uppercase text-[#C9A84C]">
            {"id" in editing && editing.id ? `Edit: ${editing.name}` : "New Team Member"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name" required>
              <Input value={editing.name ?? ""} onChange={(e) => set("name", e.target.value)} placeholder="Swapnil More" />
            </Field>
            <Field label="Title / Designation" required>
              <Input value={editing.title ?? ""} onChange={(e) => set("title", e.target.value)} placeholder="Founder & Principal Advisor" />
            </Field>
          </div>
          <Field label="Bio" hint="Short biography shown on team page">
            <Textarea value={editing.bio ?? ""} onChange={(e) => set("bio", e.target.value)} rows={4} placeholder="15+ years in luxury markets..." />
          </Field>
          <Field label="Photo">
            <ImageUploader
              value={editing.image ?? ""}
              onChange={(url) => set("image", url.split(",")[0]?.trim() ?? "")}
            />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Email" hint="Optional">
              <Input type="email" value={editing.email ?? ""} onChange={(e) => set("email", e.target.value)} placeholder="hello@aurelionluxury.com" />
            </Field>
            <Field label="LinkedIn URL" hint="Optional">
              <Input value={editing.linkedin ?? ""} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/..." />
            </Field>
            <Field label="Phone" hint="Optional">
              <Input value={editing.phone ?? ""} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Display Order" hint="Lower number = shown first">
              <Input type="number" value={String(editing.order ?? 0)} onChange={(e) => set("order", parseInt(e.target.value) || 0)} />
            </Field>
          </div>
          <Checkbox label="Published (visible on /team page)" checked={editing.published ?? true} onChange={(e) => set("published", e.target.checked)} />
          <div className="flex items-center gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50">
              {saving ? "Saving…" : "Save Member"}
            </button>
            <button onClick={() => setEditing(null)} className="border border-[#C9A84C]/20 text-[#6B6B6B] text-xs tracking-widest uppercase px-5 py-2.5 hover:border-[#C9A84C]/40 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {members.map((m) => (
          <div key={m.id} className="bg-[#111111] border border-[#C9A84C]/10 p-5 flex items-center gap-4">
            {m.image ? (
              <img src={m.image} alt={m.name} className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#C9A84C]/20" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                <span className="text-[#C9A84C] text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{m.name[0]}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-[#FFFAEC]">{m.name}</p>
                <span className="text-xs text-[#C9A84C]">{m.title}</span>
                {!m.published && <span className="text-[10px] border border-red-400/20 text-red-400/70 px-2 py-0.5 tracking-widest uppercase">Hidden</span>}
              </div>
              {m.bio && <p className="text-xs text-[#6B6B6B] mt-1 line-clamp-1">{m.bio}</p>}
              <div className="flex gap-3 mt-1">
                {m.email && <span className="text-[10px] text-[#6B6B6B]">✉ {m.email}</span>}
                {m.phone && <span className="text-[10px] text-[#6B6B6B]">✆ {m.phone}</span>}
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => setEditing(m)} className="text-[#C9A84C] text-xs hover:underline">Edit</button>
              <button onClick={() => handleDelete(m.id)} className="text-red-400/70 text-xs hover:text-red-400">Delete</button>
            </div>
          </div>
        ))}
        {members.length === 0 && !editing && (
          <p className="text-[#6B6B6B] text-sm bg-[#111111] border border-[#C9A84C]/10 p-8 text-center">No team members yet. Add your first member above.</p>
        )}
      </div>
    </div>
  );
}
