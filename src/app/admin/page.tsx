import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const admin = token ? await verifyToken(token) : null;
  if (!admin) redirect("/admin/login");

  const [properties, vehicles, posts, leads, testimonials] = await Promise.all([
    prisma.property.count(),
    prisma.vehicle.count(),
    prisma.post.count(),
    prisma.lead.count(),
    prisma.testimonial.count(),
  ]);

  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  const stats = [
    { label: "Properties", value: properties, href: "/admin/properties", color: "text-[#C9A84C]" },
    { label: "Vehicles", value: vehicles, href: "/admin/vehicles", color: "text-blue-400" },
    { label: "Blog Posts", value: posts, href: "/admin/posts", color: "text-emerald-400" },
    { label: "Leads", value: leads, href: "/admin/leads", color: "text-purple-400" },
    { label: "Testimonials", value: testimonials, href: "/admin/testimonials", color: "text-[#C9A84C]" },
  ];

  const statusColors: Record<string, string> = {
    new: "text-emerald-400 border-emerald-400/30",
    contacted: "text-blue-400 border-blue-400/30",
    qualified: "text-[#C9A84C] border-[#C9A84C]/30",
    closed: "text-[#6B6B6B] border-[#6B6B6B]/30",
    lost: "text-red-400 border-red-400/30",
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-4xl font-light text-[#FFFAEC]"
        >
          Dashboard
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-1">
          Welcome back, {admin.name}. Here&apos;s what&apos;s happening.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-[#111111] border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 p-5 transition-colors group"
          >
            <p className={`text-3xl font-light ${s.color}`}>{s.value}</p>
            <p className="text-[10px] tracking-widest uppercase text-[#6B6B6B] mt-1 group-hover:text-[#A8A8A8] transition-colors">
              {s.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { label: "Add Property", href: "/admin/properties/new" },
          { label: "Add Vehicle", href: "/admin/vehicles/new" },
          { label: "New Blog Post", href: "/admin/posts/new" },
          { label: "View All Leads", href: "/admin/leads" },
        ].map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="border border-[#C9A84C]/20 text-[#C9A84C] text-xs tracking-widest uppercase px-4 py-3 text-center hover:bg-[#C9A84C]/8 transition-colors"
          >
            + {a.label}
          </Link>
        ))}
      </div>

      {/* Recent leads */}
      <div className="bg-[#111111] border border-[#C9A84C]/10">
        <div className="px-5 py-4 border-b border-[#C9A84C]/10 flex items-center justify-between">
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-xl text-[#FFFAEC]"
          >
            Recent Leads
          </h2>
          <Link
            href="/admin/leads"
            className="text-[10px] tracking-widest uppercase text-[#C9A84C] hover:underline"
          >
            View All →
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="px-5 py-6 text-sm text-[#6B6B6B]">No leads yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#C9A84C]/10">
                  {["Name", "Phone", "Service", "Status", "Date"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left tracking-widest uppercase text-[#6B6B6B]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-[#C9A84C]/5 hover:bg-[#C9A84C]/3 transition-colors">
                    <td className="px-5 py-3 text-[#FFFAEC]">{lead.name}</td>
                    <td className="px-5 py-3 text-[#A8A8A8]">{lead.phone}</td>
                    <td className="px-5 py-3 text-[#A8A8A8] capitalize">{lead.service}</td>
                    <td className="px-5 py-3">
                      <span className={`border px-2 py-0.5 text-[10px] tracking-widest uppercase ${statusColors[lead.status] ?? "text-[#6B6B6B] border-[#6B6B6B]/30"}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[#6B6B6B]">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
