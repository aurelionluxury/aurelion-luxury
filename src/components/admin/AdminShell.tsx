"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "◈" },
  { label: "Homepage", href: "/admin/homepage", icon: "⊞" },
  { label: "Properties", href: "/admin/properties", icon: "⌂" },
  { label: "Team", href: "/admin/team", icon: "◉" },
  { label: "Vehicles", href: "/admin/vehicles", icon: "◎" },
  { label: "Blog Posts", href: "/admin/posts", icon: "✦" },
  { label: "Mumbai Guide", href: "/admin/micro-markets", icon: "◉" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "❝" },
  { label: "FAQs", href: "/admin/faqs", icon: "?" },
  { label: "Financial Services", href: "/admin/financial-services", icon: "₹" },
  { label: "Leads", href: "/admin/leads", icon: "◆" },
  { label: "Gallery", href: "/admin/gallery", icon: "▣" },
  { label: "Market Ticker", href: "/admin/ticker", icon: "↑" },
  { label: "Pages", href: "/admin/pages", icon: "☰" },
  { label: "Settings", href: "/admin/settings", icon: "⚙" },
];

interface AdminShellProps {
  children: React.ReactNode;
  adminName: string;
  adminEmail: string;
}

export default function AdminShell({ children, adminName, adminEmail }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFAEC] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-56 bg-[#0D0D0D] border-r border-[#C9A84C]/12 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#C9A84C]/10 shrink-0">
          <Link href="/" target="_blank" className="block">
            <p
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-xl font-semibold tracking-widest text-[#C9A84C] uppercase"
            >
              Aurelion
            </p>
            <p className="text-[9px] tracking-[0.3em] text-[#6B6B6B] uppercase mt-0.5">
              Admin Panel
            </p>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 mb-0.5 text-xs tracking-wider uppercase transition-colors ${
                isActive(item.href)
                  ? "bg-[#C9A84C]/10 text-[#C9A84C] border-l-2 border-[#C9A84C]"
                  : "text-[#6B6B6B] hover:text-[#FFFAEC] hover:bg-white/3"
              }`}
            >
              <span className="text-[14px] w-4 text-center shrink-0">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-[#C9A84C]/10 shrink-0">
          <p className="text-[11px] text-[#FFFAEC] font-medium truncate">{adminName}</p>
          <p className="text-[10px] text-[#6B6B6B] truncate mt-0.5">{adminEmail}</p>
          <button
            onClick={handleLogout}
            className="mt-3 text-[10px] tracking-widest uppercase text-[#6B6B6B] hover:text-red-400 transition-colors"
          >
            Sign Out →
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-[#0D0D0D]/90 backdrop-blur-sm border-b border-[#C9A84C]/10 px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#6B6B6B] hover:text-[#C9A84C]"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </button>
          <div className="flex-1" />
          <Link
            href="/"
            target="_blank"
            className="text-[10px] tracking-widest uppercase text-[#6B6B6B] hover:text-[#C9A84C] transition-colors"
          >
            View Site ↗
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
