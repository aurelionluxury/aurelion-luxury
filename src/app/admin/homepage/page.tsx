"use client";

import { useEffect, useState } from "react";
import { Field, Input, Textarea } from "@/components/admin/AdminFormField";

const DEFAULTS: Record<string, string> = {
  home_hero_eyebrow: "Complimentary Advisory for Discerning Families",
  home_hero_headline: "Your single point advisor for luxury homes, performance vehicles & wealth protection",
  home_hero_subtitle: "Developer & dealer funded advisory in Mumbai — at zero cost to you.",
  home_hero_btn1_text: "Explore Properties",
  home_hero_btn1_link: "/real-estate",
  home_hero_btn2_text: "Schedule Consultation",
  home_hero_btn2_link: "/contact",
  home_expert_name: "Swapnil",
  home_expert_title: "Founder & Principal Advisor",
  home_expert_initial: "S",
  home_expert_desc1: "With 15+ years in luxury automobile sales and a foundation in engineering, we bring technical precision to every recommendation.",
  home_expert_desc2: "IRDAI certified for insurance advisory. Developer & dealer funded — so our loyalty is always to you.",
  home_expert_credentials: "Engineering,MBA,IRDAI Certified",
  home_cta_eyebrow: "Begin Your Journey",
  home_cta_headline: "Let's Find Your Perfect Match",
  home_cta_subtitle: "A private consultation. No pressure. No fees. Just expert guidance tailored to your needs.",
  home_cta_btn1_text: "Book a Private Consultation",
  home_cta_btn1_link: "/contact",
  home_cta_btn2_text: "Our Zero-Fee Model",
  home_cta_btn2_link: "/brokerage",
};

export default function HomepageAdminPage() {
  const [form, setForm] = useState<Record<string, string>>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/homepage")
      .then((r) => r.json())
      .then((data) => {
        setForm({ ...DEFAULTS, ...data });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/homepage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return (
    <div className="flex items-center justify-center h-40">
      <p className="text-[#6B6B6B] text-xs tracking-widest uppercase">Loading…</p>
    </div>
  );

  const section = (title: string, children: React.ReactNode) => (
    <div className="bg-[#111111] border border-[#C9A84C]/10 p-6 space-y-5">
      <h2 className="text-xs tracking-widest uppercase text-[#C9A84C] pb-2 border-b border-[#C9A84C]/10">{title}</h2>
      {children}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">
          Homepage Content
        </h1>
        <a href="/" target="_blank" className="text-[10px] tracking-widest uppercase text-[#6B6B6B] hover:text-[#C9A84C] transition-colors">
          Preview Site ↗
        </a>
      </div>

      <form onSubmit={handleSave} className="max-w-3xl space-y-5">

        {/* ── HERO ── */}
        {section("Hero Section", <>
          <Field label="Eyebrow Text" hint="Small text above the headline">
            <Input value={form.home_hero_eyebrow} onChange={(e) => set("home_hero_eyebrow", e.target.value)} />
          </Field>
          <Field label="Headline" hint="Main heading — appears in large serif font">
            <Textarea value={form.home_hero_headline} onChange={(e) => set("home_hero_headline", e.target.value)} rows={3} />
          </Field>
          <Field label="Subtitle" hint="Smaller text below headline">
            <Textarea value={form.home_hero_subtitle} onChange={(e) => set("home_hero_subtitle", e.target.value)} rows={2} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Button 1 Text">
              <Input value={form.home_hero_btn1_text} onChange={(e) => set("home_hero_btn1_text", e.target.value)} />
            </Field>
            <Field label="Button 1 Link">
              <Input value={form.home_hero_btn1_link} onChange={(e) => set("home_hero_btn1_link", e.target.value)} placeholder="/real-estate" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Button 2 Text">
              <Input value={form.home_hero_btn2_text} onChange={(e) => set("home_hero_btn2_text", e.target.value)} />
            </Field>
            <Field label="Button 2 Link">
              <Input value={form.home_hero_btn2_link} onChange={(e) => set("home_hero_btn2_link", e.target.value)} placeholder="/contact" />
            </Field>
          </div>
        </>)}

        {/* ── EXPERT EVALUATOR ── */}
        {section("Expert Evaluator Section", <>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Name">
              <Input value={form.home_expert_name} onChange={(e) => set("home_expert_name", e.target.value)} placeholder="Swapnil" />
            </Field>
            <Field label="Title / Designation">
              <Input value={form.home_expert_title} onChange={(e) => set("home_expert_title", e.target.value)} placeholder="Founder & Principal Advisor" />
            </Field>
            <Field label="Monogram Initial" hint="Letter shown in circle">
              <Input value={form.home_expert_initial} onChange={(e) => set("home_expert_initial", e.target.value)} placeholder="S" maxLength={1} />
            </Field>
          </div>
          <Field label="Description (Line 1)">
            <Textarea value={form.home_expert_desc1} onChange={(e) => set("home_expert_desc1", e.target.value)} rows={3} />
          </Field>
          <Field label="Description (Line 2)">
            <Textarea value={form.home_expert_desc2} onChange={(e) => set("home_expert_desc2", e.target.value)} rows={3} />
          </Field>
          <Field label="Credentials" hint="Comma-separated, e.g. Engineering,MBA,IRDAI Certified">
            <Input value={form.home_expert_credentials} onChange={(e) => set("home_expert_credentials", e.target.value)} placeholder="Engineering,MBA,IRDAI Certified" />
          </Field>
        </>)}

        {/* ── CTA ── */}
        {section("CTA Section", <>
          <Field label="Eyebrow Text">
            <Input value={form.home_cta_eyebrow} onChange={(e) => set("home_cta_eyebrow", e.target.value)} />
          </Field>
          <Field label="Headline">
            <Input value={form.home_cta_headline} onChange={(e) => set("home_cta_headline", e.target.value)} />
          </Field>
          <Field label="Subtitle">
            <Textarea value={form.home_cta_subtitle} onChange={(e) => set("home_cta_subtitle", e.target.value)} rows={2} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Button 1 Text">
              <Input value={form.home_cta_btn1_text} onChange={(e) => set("home_cta_btn1_text", e.target.value)} />
            </Field>
            <Field label="Button 1 Link">
              <Input value={form.home_cta_btn1_link} onChange={(e) => set("home_cta_btn1_link", e.target.value)} placeholder="/contact" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Button 2 Text">
              <Input value={form.home_cta_btn2_text} onChange={(e) => set("home_cta_btn2_text", e.target.value)} />
            </Field>
            <Field label="Button 2 Link">
              <Input value={form.home_cta_btn2_link} onChange={(e) => set("home_cta_btn2_link", e.target.value)} placeholder="/brokerage" />
            </Field>
          </div>
        </>)}

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-8 py-3 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save All Changes"}
          </button>
          {saved && (
            <span className="text-emerald-400 text-xs tracking-widest uppercase">✓ Saved</span>
          )}
        </div>
      </form>
    </div>
  );
}
