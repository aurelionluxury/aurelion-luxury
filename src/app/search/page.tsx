export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const gold = "#D4AF37";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || "";

  const [properties, vehicles, posts, faqs] = q.length >= 2
    ? await Promise.all([
        prisma.property.findMany({
          where: { published: true, OR: [{ title: { contains: q } }, { location: { contains: q } }, { description: { contains: q } }, { developerName: { contains: q } }] },
          select: { id: true, title: true, slug: true, location: true, type: true, priceLabel: true },
          take: 6,
        }),
        prisma.vehicle.findMany({
          where: { OR: [{ title: { contains: q } }, { make: { contains: q } }, { model: { contains: q } }, { variant: { contains: q } }] },
          select: { id: true, title: true, slug: true, make: true, model: true, year: true, priceLabel: true },
          take: 6,
        }),
        prisma.post.findMany({
          where: { isPublished: true, OR: [{ title: { contains: q } }, { excerpt: { contains: q } }, { category: { contains: q } }] },
          select: { id: true, title: true, slug: true, excerpt: true, category: true },
          take: 6,
        }),
        prisma.fAQ.findMany({
          where: { isActive: true, OR: [{ question: { contains: q } }, { answer: { contains: q } }] },
          select: { id: true, question: true, answer: true, category: true },
          take: 6,
        }),
      ])
    : [[], [], [], []];

  const total = properties.length + vehicles.length + posts.length + faqs.length;

  return (
    <div style={{ background: "#0a0a0c", minHeight: "100vh", paddingTop: 140, paddingBottom: 100 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>Search Results</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2rem,4vw,3rem)", color: "rgba(255,255,255,0.88)", marginBottom: 12 }}>
            {q ? <>Results for <em style={{ color: gold, fontStyle: "italic" }}>&ldquo;{q}&rdquo;</em></> : "Search Aurelion Luxury"}
          </h1>
          {q && <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>{total} result{total !== 1 ? "s" : ""} found</p>}
        </div>

        <form action="/search" method="GET" style={{ marginBottom: 60 }}>
          <div style={{ display: "flex", maxWidth: 600, border: "1px solid rgba(212,175,55,0.3)", background: "rgba(255,255,255,0.02)" }}>
            <input name="q" defaultValue={q} placeholder="Search properties, cars, articles..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "14px 20px", fontSize: 14, color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif" }} />
            <button type="submit" style={{ background: gold, border: "none", padding: "14px 24px", cursor: "pointer", color: "#0a0a0c", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>Search</button>
          </div>
        </form>

        {q && total === 0 && (
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>No results found for &ldquo;{q}&rdquo;. Try a different keyword.</p>
        )}

        {properties.length > 0 && (
          <Section title="Properties">
            {properties.map((p) => <ResultCard key={p.id} href={`/real-estate/${p.slug}`} title={p.title} subtitle={p.location} tag={p.type} meta={p.priceLabel ?? undefined} />)}
          </Section>
        )}
        {vehicles.length > 0 && (
          <Section title="Vehicles">
            {vehicles.map((v) => <ResultCard key={v.id} href={`/cars/${v.slug}`} title={v.title} subtitle={`${v.make} · ${v.year}`} tag="Automobile" meta={v.priceLabel ?? undefined} />)}
          </Section>
        )}
        {posts.length > 0 && (
          <Section title="Blog & Insights">
            {posts.map((p) => <ResultCard key={p.id} href={`/blog/${p.slug}`} title={p.title} subtitle={p.excerpt ?? ""} tag={p.category} />)}
          </Section>
        )}
        {faqs.length > 0 && (
          <Section title="FAQs">
            {faqs.map((f) => <ResultCard key={f.id} href="/faq" title={f.question} subtitle={f.answer} tag={f.category} />)}
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.4rem", color: "#D4AF37", marginBottom: 24, paddingBottom: 12, borderBottom: "1px solid rgba(212,175,55,0.15)" }}>{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </div>
  );
}

function ResultCard({ href, title, subtitle, tag, meta }: { href: string; title: string; subtitle: string; tag: string; meta?: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block", padding: "20px 24px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.88)", marginBottom: 6, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{title}</p>
          {subtitle && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{subtitle.length > 120 ? subtitle.slice(0, 120) + "…" : subtitle}</p>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(212,175,55,0.25)", color: "#D4AF37", padding: "3px 10px" }}>{tag}</span>
          {meta && <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{meta}</span>}
        </div>
      </div>
    </Link>
  );
}