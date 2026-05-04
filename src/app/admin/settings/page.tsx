"use client";

import { useEffect, useState } from "react";

interface Setting {
  id: number;
  key: string;
  value: string;
}

const SETTING_GROUPS: { label: string; keys: { key: string; label: string; hint?: string; multiline?: boolean }[] }[] = [
  {
    label: "Contact & Business",
    keys: [
      { key: "phone", label: "Phone Number", hint: "+91 8433551388" },
      { key: "whatsapp", label: "WhatsApp Number", hint: "+91 8433551388" },
      { key: "email", label: "Email Address", hint: "aurelionluxury@gmail.com" },
      { key: "address", label: "Office Address", multiline: true, hint: "Goregaon West, Mumbai" },
      { key: "contact_timing", label: "Office Hours", hint: "Mon-Sat, 10 AM - 7 PM IST" },
      { key: "contact_branches", label: "Branch/Franchise Offices (JSON)", multiline: true, hint: 'e.g. [{"city":"Pune","address":"MG Road","phone":"+91 9999","email":"pune@..."}]' },
    ],
  },
  {
    label: "Social Media",
    keys: [
      { key: "instagram_url", label: "Instagram URL" },
      { key: "linkedin_url", label: "LinkedIn URL" },
      { key: "youtube_url", label: "YouTube URL" },
    ],
  },
  {
    label: "Homepage",
    keys: [
      { key: "hero_tagline", label: "Hero Tagline", hint: "Main headline on homepage" },
      { key: "hero_sub", label: "Hero Sub-text", hint: "Supporting text below headline" },
      { key: "stats_properties", label: "Stats: Properties Curated", hint: "e.g. 200+" },
      { key: "stats_clients", label: "Stats: Clients Served", hint: "e.g. 500+" },
      { key: "stats_experience", label: "Stats: Years Experience", hint: "e.g. 15+" },
    ],
  },
  {
    label: "SEO",
    keys: [
      { key: "meta_title", label: "Default Meta Title" },
      { key: "meta_description", label: "Default Meta Description", multiline: true },
      { key: "og_image", label: "Default OG Image URL" },
    ],
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function load() {
    const r = await fetch("/api/admin/settings");
    const items: Setting[] = await r.json();
    const map: Record<string, string> = {};
    items.forEach(s => { map[s.key] = s.value; });
    setSettings(map);
    setEditing(map);
  }

  useEffect(() => { load(); }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const changed = Object.keys(editing).filter(k => editing[k] !== settings[k]);
    const allKeys = new Set([...Object.keys(editing), ...Object.keys(settings)]);
    const toSave = Array.from(allKeys).filter(k => editing[k] !== settings[k]);

    await Promise.all(
      toSave.map(key =>
        fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value: editing[key] ?? "" }),
        })
      )
    );

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    load();
  }

  const set = (key: string, value: string) =>
    setEditing(e => ({ ...e, [key]: value }));

  const hasChanges = Object.keys(editing).some(k => editing[k] !== settings[k]);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    if (pwForm.next !== pwForm.confirm) {
      setPwMsg({ ok: false, text: "New passwords do not match." });
      return;
    }
    if (pwForm.next.length < 8) {
      setPwMsg({ ok: false, text: "Password must be at least 8 characters." });
      return;
    }
    setPwSaving(true);
    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
    });
    const data = await res.json();
    setPwSaving(false);
    if (res.ok) {
      setPwMsg({ ok: true, text: "Password changed successfully." });
      setPwForm({ current: "", next: "", confirm: "" });
    } else {
      setPwMsg({ ok: false, text: data.error ?? "Failed to change password." });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">Site Settings</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-green-400">Saved ✓</span>}
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save All"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {SETTING_GROUPS.map(group => (
          <div key={group.label} className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-4">
            <h2 className="text-xs tracking-widest uppercase text-[#C9A84C]">{group.label}</h2>
            {group.keys.map(({ key, label, hint, multiline }) => (
              <div key={key}>
                <label className="block text-[10px] tracking-widest uppercase text-[#6B6B6B] mb-1.5">
                  {label}
                  {hint && <span className="ml-2 normal-case text-[#6B6B6B]/60">{hint}</span>}
                </label>
                {multiline ? (
                  <textarea
                    value={editing[key] ?? ""}
                    onChange={(e) => set(key, e.target.value)}
                    rows={3}
                    className="w-full bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#FFFAEC] text-sm px-3 py-2.5 outline-none focus:border-[#C9A84C]/50 transition-colors placeholder:text-[#6B6B6B] resize-y"
                  />
                ) : (
                  <input
                    value={editing[key] ?? ""}
                    onChange={(e) => set(key, e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#FFFAEC] text-sm px-3 py-2.5 outline-none focus:border-[#C9A84C]/50 transition-colors placeholder:text-[#6B6B6B]"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Custom keys section */}
      <div className="mt-6 bg-[#111111] border border-[#C9A84C]/10 p-6">
        <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-4">All Settings (Raw)</h2>
        <div className="space-y-2">
          {Object.entries(settings).map(([k, v]) => (
            <div key={k} className="flex items-center gap-3 text-xs">
              <span className="text-[#6B6B6B] font-mono w-48 shrink-0 truncate">{k}</span>
              <span className="text-[#A8A8A8] truncate flex-1">{v}</span>
            </div>
          ))}
          {Object.keys(settings).length === 0 && <p className="text-[#6B6B6B] text-sm">No settings saved yet. Fill in the form above and click Save All.</p>}
        </div>
      </div>

      {/* Change Password */}
      <div className="mt-6 bg-[#111111] border border-[#C9A84C]/10 p-6">
        <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-6">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-sm">
          {[
            { label: "Current Password", field: "current" as const, placeholder: "Enter current password" },
            { label: "New Password", field: "next" as const, placeholder: "Min. 8 characters" },
            { label: "Confirm New Password", field: "confirm" as const, placeholder: "Repeat new password" },
          ].map(({ label, field, placeholder }) => (
            <div key={field}>
              <label className="block text-[10px] tracking-widest uppercase text-[#6B6B6B] mb-1.5">{label}</label>
              <input
                type="password"
                value={pwForm[field]}
                onChange={e => setPwForm(p => ({ ...p, [field]: e.target.value }))}
                placeholder={placeholder}
                required
                className="w-full bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#FFFAEC] text-sm px-3 py-2.5 outline-none focus:border-[#C9A84C]/50 transition-colors placeholder:text-[#6B6B6B]"
              />
            </div>
          ))}
          {pwMsg && (
            <p className={`text-xs ${pwMsg.ok ? "text-green-400" : "text-red-400"}`}>{pwMsg.text}</p>
          )}
          <button
            type="submit"
            disabled={pwSaving}
            className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50"
          >
            {pwSaving ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
