"use client";

import AdminTable from "./AdminTable";

export default function VehiclesTable({ vehicles }: { vehicles: Record<string, unknown>[] }) {
  return (
    <AdminTable
      title="Vehicles"
      newHref="/admin/vehicles/new"
      data={vehicles}
      editHrefBase="/admin/vehicles"
      deleteEndpointBase="/api/admin/vehicles"
      columns={[
        { key: "title", label: "Title" },
        { key: "make", label: "Make" },
        { key: "year", label: "Year" },
        {
          key: "condition",
          label: "Condition",
          render: (v) => (
            <span className={`border px-2 py-0.5 text-[10px] tracking-widest uppercase ${
              v === "new" ? "text-emerald-400 border-emerald-400/30" : "text-blue-400 border-blue-400/30"
            }`}>{String(v)}</span>
          ),
        },
        { key: "price", label: "Price (Cr)", render: (v) => `₹${Number(v).toFixed(2)} Cr` },
        { key: "status", label: "Status" },
        {
          key: "featured",
          label: "Featured",
          render: (v) => v ? <span className="text-[#C9A84C]">★</span> : <span className="text-[#6B6B6B]">—</span>,
        },
      ]}
    />
  );
}
