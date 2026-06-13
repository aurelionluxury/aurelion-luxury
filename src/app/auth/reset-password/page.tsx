"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setStatus("error"); setMessage("Passwords do not match."); return; }
    if (password.length < 8) { setStatus("error"); setMessage("Min. 8 characters required."); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setTimeout(() => router.push("/admin/login"), 2000);
      } else {
        setStatus("error");
        setMessage(data.error ?? "Reset failed.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-[11px] tracking-widest uppercase text-[#6B6B6B] mb-2">New Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
          className="w-full bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#FFFAEC] text-sm px-4 py-3 outline-none focus:border-[#C9A84C]/60"
          placeholder="Min. 8 characters" />
      </div>
      <div>
        <label className="block text-[11px] tracking-widest uppercase text-[#6B6B6B] mb-2">Confirm Password</label>
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
          className="w-full bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#FFFAEC] text-sm px-4 py-3 outline-none focus:border-[#C9A84C]/60"
          placeholder="Repeat new password" />
      </div>
      {status === "error" && <p className="text-red-400 text-xs border border-red-400/20 bg-red-400/5 px-3 py-2">{message}</p>}
      {status === "success" && <p className="text-green-400 text-xs border border-green-400/20 bg-green-400/5 px-3 py-2">Password reset! Redirecting…</p>}
      <button type="submit" disabled={status === "loading" || status === "success"}
        className="w-full bg-[#C9A84C] text-[#0A0A0A] font-medium text-xs tracking-widest uppercase py-3 hover:bg-[#D5B978] transition-colors disabled:opacity-50">
        {status === "loading" ? "Resetting…" : "Reset Password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-10">
          <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-semibold tracking-widest text-[#C9A84C] uppercase">Aurelion</p>
          <p className="text-[10px] tracking-[0.3em] text-[#6B6B6B] uppercase mt-0.5">Luxury · Admin</p>
        </div>
        <div className="border border-[#C9A84C]/20 bg-[#111111] p-8">
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-light text-[#FFFAEC] mb-2">New Password</h1>
          <p className="text-xs text-[#6B6B6B] mb-8 tracking-wide">Enter your new admin password</p>
          <Suspense fallback={<p className="text-[#6B6B6B] text-sm">Loading…</p>}>
            <ResetForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}