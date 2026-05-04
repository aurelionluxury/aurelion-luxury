"use client";

import AdminTable from "./AdminTable";

interface Property {
  id: number;
  title: string;
  location: string;
  developerName?: string | null;
  area?: string | null;
  config?: string | null;
  priceLabel?: string | null;
  price: number;
  status: string;
  featured: boolean;
  published?: boolean | null;
}

export default function PropertiesTable({ properties }: { properties: Property[] }) {
  return (
    <AdminTable
      title="Properties"
      newHref="/admin/properties/new"
      data={properties as unknown as Record<string, unknown>[]}
      editHrefBase="/admin/properties"
      deleteEndpointBase="/api/admin/properties"
      columns={[
        { key: "title", label: "Title" },
        { key: "location", label: "Location" },
        { key: "developerName", label: "Developer" },
        { key: "config", label: "Config" },
        { key: "priceLabel", label: "Price" },
        {
          key: "status",
          label: "Status",
          render: (v) => {
            const colors: Record<string, string> = {
              new_launch: "text-[#C9A84C] border-[#C9A84C]/30",
              under_construction: "text-amber-400 border-amber-400/30",
              ready_to_move: "text-emerald-400 border-emerald-400/30",
              available: "text-emerald-400 border-emerald-400/30",
              sold: "text-[#6B6B6B] border-[#6B6B6B]/30",
            };
            const cls = colors[String(v)] ?? "text-[#6B6B6B] border-[#6B6B6B]/30";
            return (
              <span className={`border px-2 py-0.5 text-[10px] tracking-widest uppercase ${cls}`}>
                {String(v).replace(/_/g, " ")}
              </span>
            );
          },
        },
        {
          key: "featured",
          label: "Featured",
          render: (v) => v ? <span className="text-[#C9A84C]">★</span> : <span className="text-[#6B6B6B]">—</span>,
        },
        {
          key: "published",
          label: "Published",
          render: (v) => v !== false
            ? <span className="text-emerald-400 text-[10px] tracking-widest uppercase">Yes</span>
            : <span className="text-[#6B6B6B] text-[10px] tracking-widest uppercase">No</span>,
        },
      ]}
    />
  );
}
