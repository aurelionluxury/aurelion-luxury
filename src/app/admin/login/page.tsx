"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-3xl font-semibold tracking-widest text-[#C9A84C] uppercase"
          >
            Aurelion
          </p>
          <p className="text-[10px] tracking-[0.3em] text-[#6B6B6B] uppercase mt-0.5">
            Luxury · Admin
          </p>
        </div>

        {/* Card */}
        <div className="border border-[#C9A84C]/20 bg-[#111111] p-8">
          <h1
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-2xl font-light text-[#FFFAEC] mb-2"
          >
            Sign In
          </h1>
          <p className="text-xs text-[#6B6B6B] mb-8 tracking-wide">
            Access the admin dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] tracking-widest uppercase text-[#6B6B6B] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#FFFAEC] text-sm px-4 py-3 outline-none focus:border-[#C9A84C]/60 transition-colors placeholder:text-[#6B6B6B]"
                placeholder="admin@aurelionluxury.com"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-widest uppercase text-[#6B6B6B] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-[#1A1A1A] border border-[#C9A84C]/20 text-[#FFFAEC] text-sm px-4 py-3 outline-none focus:border-[#C9A84C]/60 transition-colors placeholder:text-[#6B6B6B]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs tracking-wide border border-red-400/20 bg-red-400/5 px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A84C] text-[#0A0A0A] font-medium text-xs tracking-widest uppercase py-3 hover:bg-[#D5B978] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-[#6B6B6B] mt-6">
          Aurelion Luxury Admin · Restricted Access
        </p>
      </div>
    </div>
  );
}
