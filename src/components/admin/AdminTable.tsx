"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface AdminTableProps {
  data: Record<string, unknown>[];
  columns: Column[];
  editHrefBase?: string;
  deleteEndpointBase?: string;
  newHref?: string;
  title: string;
}

export default function AdminTable({
  data,
  columns,
  editHrefBase,
  deleteEndpointBase,
  newHref,
  title,
}: AdminTableProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<number | null>(null);

  async function handleDelete(row: Record<string, unknown>) {
    if (!deleteEndpointBase) return;
    if (!confirm(`Delete this ${title.toLowerCase().slice(0, -1)}?`)) return;
    setDeleting(row.id as number);
    await fetch(`${deleteEndpointBase}/${row.id}`, { method: "DELETE" });
    router.refresh();
    setDeleting(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-3xl font-light text-[#FFFAEC]"
        >
          {title}
        </h1>
        {newHref && (
          <Link
            href={newHref}
            className="bg-[#C9A84C] text-[#0A0A0A] text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-[#D5B978] transition-colors font-medium"
          >
            + New
          </Link>
        )}
      </div>

      {data.length === 0 ? (
        <div className="bg-[#111111] border border-[#C9A84C]/10 p-10 text-center">
          <p className="text-[#6B6B6B] text-sm">No {title.toLowerCase()} yet.</p>
          {newHref && (
            <Link href={newHref} className="text-[#C9A84C] text-xs tracking-widest uppercase mt-3 inline-block hover:underline">
              Add your first →
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-[#111111] border border-[#C9A84C]/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#C9A84C]/10">
                  {columns.map((col) => (
                    <th key={col.key} className="px-5 py-3 text-left tracking-widest uppercase text-[#6B6B6B] whitespace-nowrap">
                      {col.label}
                    </th>
                  ))}
                  {(editHrefBase || deleteEndpointBase) && (
                    <th className="px-5 py-3 text-right tracking-widest uppercase text-[#6B6B6B]">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={String(row.id)} className="border-b border-[#C9A84C]/5 hover:bg-[#C9A84C]/3 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-3 text-[#A8A8A8] max-w-xs truncate">
                        {col.render
                          ? col.render(row[col.key], row)
                          : String(row[col.key] ?? "—")}
                      </td>
                    ))}
                    {(editHrefBase || deleteEndpointBase) && (
                      <td className="px-5 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-3">
                          {editHrefBase && (
                            <Link
                              href={`${editHrefBase}/${row.id}`}
                              className="text-[#C9A84C] hover:underline tracking-wider"
                            >
                              Edit
                            </Link>
                          )}
                          {deleteEndpointBase && (
                            <button
                              onClick={() => handleDelete(row)}
                              disabled={deleting === row.id}
                              className="text-red-400/70 hover:text-red-400 transition-colors disabled:opacity-40"
                            >
                              {deleting === row.id ? "…" : "Delete"}
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
