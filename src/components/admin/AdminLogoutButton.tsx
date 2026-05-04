"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left text-xs tracking-wider uppercase text-[#6B6B6B] hover:text-red-400 transition-colors px-3 py-2"
    >
      Sign Out
    </button>
  );
}
