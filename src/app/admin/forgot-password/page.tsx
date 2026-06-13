"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"sent"|"error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="relative w-full max-w-sm">
        <div className="text-center mb-10">
          <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl font-semibold tracking-widest text-[#C9A84C] uppercase">Aurelion</p>
          <p className="text-[10px] tracking-[0.3em] text-[#6B6B6B] uppercase mt-0.5">Luxury · Admin</p>
        </div>
        <div className="border border-[#C9A84C]/20 bg-[#111111] p-8">
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-light text-[#FFFAEC] mb-2">Reset Password</h1>
          <p className="text-xs text-[#6B6B6B] mb-8 tracking-wide">Enter your email to receive a reset link</p>

          {status === "sent" ? (
            <div className="text-center py-4">
              <div className="text-[#C9A84C] text-3xl mb-4">✓</div>
              <p className="text-[#FFFAEC] text-sm mb-2">Reset link sent!</p>
              <p className="text-[#6B6B6B] text-xs">Check aurelionluxury@gmail.com for the reset link. Valid for 1 hour.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] tracking-widest uppercase text-[#6B6B6B] mb-2">Email</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#FFFAEC] text-sm px-4 py-3 outline-none focus:border-[#C9A84C]/60 transition-colors"
                  placeholder="aurelionluxury@gmail.com"
                />
              </div>
              {status === "error" && <p className="text-red-400 text-xs border border-red-400/20 bg-red-400/5 px-3 py-2">{message}</p>}
              <button type="submit" disabled={status === "loading"}
                className="w-full bg-[#C9A84C] text-[#0A0A0A] font-medium text-xs tracking-widest uppercase py-3 hover:bg-[#D5B978] transition-colors disabled:opacity-50">
                {status === "loading" ? "Sending…" : "Send Reset Link"}
              </button>
              <div className="text-center">
                <a href="/admin/login" className="text-[11px] text-[#6B6B6B] hover:text-[#C9A84C] tracking-wide">← Back to Login</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}