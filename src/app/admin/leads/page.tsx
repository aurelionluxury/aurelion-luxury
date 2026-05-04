"use client";

import { useEffect, useState } from "react";

interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  service: string;
  message: string | null;
  source: string | null;
  budget: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "text-blue-400 border-blue-400/30 bg-blue-400/5",
  contacted: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
  qualified: "text-[#C9A84C] border-[#C9A84C]/30 bg-[#C9A84C]/5",
  converted: "text-green-400 border-green-400/30 bg-green-400/5",
  lost: "text-red-400/70 border-red-400/20 bg-red-400/5",
};

const STATUSES = ["new", "contacted", "qualified", "converted", "lost"];

export default function LeadsPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ status: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("all");

  async function load() {
    const r = await fetch("/api/admin/leads");
    setItems(await r.json());
  }

  useEffect(() => { load(); }, []);

  function startEdit(lead: Lead) {
    setEditingId(lead.id);
    setEditData({ status: lead.status, notes: lead.notes ?? "" });
  }

  async function handleSave(id: number) {
    setSaving(true);
    await fetch(`/api/admin/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setEditingId(null);
    setSaving(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    load();
  }

  const filtered = filter === "all" ? items : items.filter(l => l.status === filter);

  const counts = STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = items.filter(l => l.status === s).length;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-light text-[#FFFAEC]">Leads</h1>
        <span className="text-xs text-[#6B6B6B]">{items.length} total</span>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`text-[10px] tracking-widest uppercase px-3 py-1.5 border transition-colors ${filter === "all" ? "border-[#C9A84C] text-[#C9A84C]" : "border-[#C9A84C]/20 text-[#6B6B6B] hover:border-[#C9A84C]/40"}`}
        >
          All ({items.length})
        </button>
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-[10px] tracking-widest uppercase px-3 py-1.5 border transition-colors ${filter === s ? "border-[#C9A84C] text-[#C9A84C]" : "border-[#C9A84C]/20 text-[#6B6B6B] hover:border-[#C9A84C]/40"}`}
          >
            {s} ({counts[s] ?? 0})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((lead) => (
          <div key={lead.id} className="bg-[#111111] border border-[#C9A84C]/10 p-5">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-sm font-medium text-[#FFFAEC]">{lead.name}</p>
                  <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 border ${STATUS_COLORS[lead.status] ?? STATUS_COLORS.new}`}>
                    {lead.status}
                  </span>
                  <span className="text-[10px] border border-[#C9A84C]/15 text-[#6B6B6B] px-2 py-0.5 tracking-widest uppercase">{lead.service}</span>
                </div>
                <div className="flex gap-4 text-xs text-[#6B6B6B] mb-2">
                  <span>{lead.phone}</span>
                  {lead.email && <span>{lead.email}</span>}
                  {lead.source && <span>via {lead.source}</span>}
                  <span>{new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
                {lead.budget && (
                  <span className="inline-block text-[10px] tracking-widest uppercase border border-[#C9A84C]/20 text-[#C9A84C]/70 px-2 py-0.5 mb-2 mr-2">
                    Budget: {lead.budget}
                  </span>
                )}
                {lead.message && <p className="text-xs text-[#A8A8A8] italic mb-2">&ldquo;{lead.message}&rdquo;</p>}
                {lead.notes && editingId !== lead.id && (
                  <p className="text-xs text-[#C9A84C]/70 mt-1">Note: {lead.notes}</p>
                )}
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => startEdit(lead)} className="text-[#C9A84C] text-xs hover:underline">Update</button>
                <button onClick={() => handleDelete(lead.id)} className="text-red-400/70 text-xs hover:text-red-400">Delete</button>
              </div>
            </div>

            {editingId === lead.id && (
              <div className="mt-4 pt-4 border-t border-[#C9A84C]/10 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-[#6B6B6B] mb-1.5">Status</label>
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData(d => ({ ...d, status: e.target.value }))}
                      className="w-full bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#FFFAEC] text-sm px-3 py-2 outline-none focus:border-[#C9A84C]/50"
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-[#6B6B6B] mb-1.5">Notes</label>
                    <input
                      value={editData.notes}
                      onChange={(e) => setEditData(d => ({ ...d, notes: e.target.value }))}
                      className="w-full bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#FFFAEC] text-sm px-3 py-2 outline-none focus:border-[#C9A84C]/50"
                      placeholder="Add a note…"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleSave(lead.id)} disabled={saving} className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-4 py-2 hover:bg-[#D5B978] transition-colors font-medium disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
                  <button onClick={() => setEditingId(null)} className="border border-[#C9A84C]/20 text-[#6B6B6B] text-xs tracking-widest uppercase px-4 py-2 hover:border-[#C9A84C]/40 transition-colors">Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-[#6B6B6B] text-sm bg-[#111111] border border-[#C9A84C]/10 p-8 text-center">No leads {filter !== "all" ? `with status "${filter}"` : "yet"}.</p>}
      </div>
    </div>
  );
}
