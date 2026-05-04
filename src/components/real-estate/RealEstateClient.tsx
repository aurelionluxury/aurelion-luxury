"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type Property = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  location: string | null;
  area: string | null;
  type: string | null;
  status: string | null;
  price: number | null;
  priceLabel: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  carpetArea: number | null;
  builtUpArea: number | null;
  facing: string | null;
  amenities: unknown;
  images: unknown;
  featured: boolean;
  developerName: string | null;
  reraNumber: string | null;
  possession: string | null;
  typology: string | null;
  config: string | null;
};

type NewProject = {
  id: number;
  title: string;
  slug: string;
  location: string | null;
  area: string | null;
  developerName: string | null;
  typology: string | null;
  config: string | null;
  possession: string | null;
  priceLabel: string | null;
  price: number | null;
  status: string | null;
  featured: boolean;
};

type Props = {
  properties: Property[];
  total: number;
  currentPage: number;
  newProjects: NewProject[];
  currentParams: {
    location?: string;
    type?: string;
    budget?: string;
    bedrooms?: string;
    page?: string;
  };
};

function getFirstImage(raw: string | null): string | null {
  if (!raw) return null;
  const s = raw.trim();
  if (!s) return null;
  try {
    const arr = JSON.parse(s);
    if (Array.isArray(arr) && arr.length > 0) return String(arr[0]).trim() || null;
    if (typeof arr === "string" && arr.trim()) return arr.trim();
  } catch { /* not JSON */ }
  const first = s.split(",")[0]?.trim();
  return first || null;
}

function formatPrice(price: number | null, priceLabel: string | null): string {
  if (priceLabel) return priceLabel;
  if (!price) return "Price on Request";
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}

const STATUS_BADGE: Record<string, { label: string; color: string; bg: string; border: string }> = {
  new_launch:         { label: "New Launch",          color: "#D4AF37", bg: "rgba(212,175,55,0.1)",  border: "rgba(212,175,55,0.4)" },
  under_construction: { label: "Under Construction",  color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.4)" },
  ready_to_move:      { label: "Ready to Move",       color: "#34D399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.4)" },
  available:          { label: "Available",            color: "#34D399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.4)" },
};

function StatusBadge({ status }: { status: string | null }) {
  if (!status) return null;
  const badge = STATUS_BADGE[status] ?? { label: status, color: "#D4AF37", bg: "rgba(212,175,55,0.1)", border: "rgba(212,175,55,0.3)" };
  return (
    <span style={{
      fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
      color: badge.color, background: badge.bg, border: `1px solid ${badge.border}`,
      padding: "3px 8px", borderRadius: 2, whiteSpace: "nowrap",
    }}>
      {badge.label}
    </span>
  );
}

function NewProjectCard({ project, index }: { project: NewProject; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 10,
        backdropFilter: "blur(20px)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        transition: "border-color 0.3s, box-shadow 0.3s",
        cursor: "pointer",
      }}
      whileHover={{ borderColor: "rgba(212,175,55,0.2)", boxShadow: "0 8px 32px rgba(212,175,55,0.06)", y: -3 }}
    >
      {/* Top row: status + featured */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <StatusBadge status={project.status} />
        {project.featured && (
          <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4AF37", opacity: 0.7 }}>
            · Featured
          </span>
        )}
      </div>

      {/* Project name */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
        fontSize: "1.2rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.3, marginBottom: 4,
      }}>
        {project.title}
      </h3>

      {/* Developer */}
      {project.developerName && (
        <p style={{ fontSize: 11, color: "#D4AF37", letterSpacing: "0.08em", marginBottom: 10, fontWeight: 400 }}>
          {project.developerName}
        </p>
      )}

      {/* Location */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.6)" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{project.location}</span>
      </div>

      {/* Typology */}
      {project.typology && (
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", marginBottom: 14, fontStyle: "italic" }}>
          {project.typology}
        </p>
      )}

      {/* Config + Possession row */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
        {project.config && (
          <div>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Config</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{project.config}</p>
          </div>
        )}
        {project.possession && (
          <div>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Possession</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{project.possession}</p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 14 }} />

      {/* Price + CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <p style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Starting Price</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#D4AF37", fontWeight: 300 }}>
            {formatPrice(project.price, project.priceLabel)}
          </p>
        </div>
        <Link
          href="/contact?interest=real_estate"
          style={{
            fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#D4AF37", textDecoration: "none", whiteSpace: "nowrap",
            border: "1px solid rgba(212,175,55,0.3)", padding: "7px 14px",
            transition: "background 0.25s, border-color 0.25s",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(212,175,55,0.08)"; el.style.borderColor = "rgba(212,175,55,0.6)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = "rgba(212,175,55,0.3)"; }}
        >
          Private Site Visit →
        </Link>
      </div>
    </motion.div>
  );
}

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        backdropFilter: "blur(20px)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      whileHover={{
        y: -4,
        borderColor: "rgba(212,175,55,0.3)",
        boxShadow: "0 8px 40px rgba(212,175,55,0.08)",
      }}
    >
      {/* Image Area */}
      {(() => {
        const imgSrc = getFirstImage(property.images as string | null);
        return (
          <div style={{ height: 280, background: "linear-gradient(135deg, #0a1628 0%, #0a0a0c 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            {imgSrc ? (
              <img src={imgSrc} alt={property.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            )}
            {property.featured && (
              <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37", fontSize: 10, letterSpacing: "0.12em", padding: "4px 10px", textTransform: "uppercase", borderRadius: 4, zIndex: 1 }}>
                Featured
              </div>
            )}
            {property.status && (
              <div style={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}>
                <StatusBadge status={property.status} />
              </div>
            )}
          </div>
        );
      })()}

      {/* Content */}
      <div style={{ padding: "24px" }}>
        {property.typology && (
          <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 8 }}>
            {property.typology}
          </div>
        )}
        <Link href={`/real-estate/${property.slug}`} style={{ textDecoration: "none" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.2rem", color: "rgba(255,255,255,0.88)", marginBottom: 8, lineHeight: 1.4, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#D4AF37")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.88)")}
          >
            {property.title}
          </h3>
        </Link>

        {property.area && (
          <div style={{ fontSize: 13, color: "#D4AF37", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {property.area}
          </div>
        )}

        {(property.config || property.bedrooms || property.carpetArea) && (
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>
            {property.config || (property.bedrooms ? `${property.bedrooms} BHK` : "")}
            {(property.config || property.bedrooms) && property.carpetArea ? " · " : ""}
            {property.carpetArea ? `${property.carpetArea.toLocaleString("en-IN")} sqft` : ""}
          </div>
        )}

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 16 }} />

        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.3rem", color: "#D4AF37", marginBottom: 12 }}>
          {formatPrice(property.price, property.priceLabel)}
        </div>

        <Link href="/contact?interest=real_estate"
          style={{ fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#D4AF37")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
        >
          Connect for Private Site Visit →
        </Link>
      </div>
    </motion.div>
  );
}

export default function RealEstateClient({ properties, total, currentPage, currentParams, newProjects }: Props) {
  const router = useRouter();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const newRef = useRef(null);
  const newInView = useInView(newRef, { once: true, amount: 0.1 });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });

  const totalPages = Math.ceil(total / 9);

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams();
    const merged = { ...currentParams, [key]: value, page: "1" };
    Object.entries(merged).forEach(([k, v]) => { if (v && v !== "") params.set(k, v); });
    if (key === "page") {
      const p = new URLSearchParams();
      const all = { ...currentParams, page: value };
      Object.entries(all).forEach(([k, v]) => { if (v && v !== "") p.set(k, v); });
      router.push(`/real-estate?${p.toString()}`);
      return;
    }
    router.push(`/real-estate?${params.toString()}`);
  }

  const selectStyle: React.CSSProperties = {
    background: "#1a1a1f", border: "1px solid rgba(212,175,55,0.15)",
    color: "rgba(255,255,255,0.7)", padding: "8px 12px", fontSize: 12,
    letterSpacing: "0.05em", borderRadius: 6, outline: "none", cursor: "pointer", minWidth: 160,
  };

  return (
    <div style={{ background: "#0a0a0c", minHeight: "100vh" }}>
      {/* Hero */}
      <section ref={heroRef} style={{ background: "#0a0a0c", paddingTop: 140, paddingBottom: 60, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80" alt="Luxury real estate" fill style={{ objectFit: "cover", opacity: 0.15 }} />
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(10,10,12,0.85), rgba(10,10,12,0.7))" }} />
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 20 }}>
              Premium Portfolio
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.4rem,5vw,3.8rem)", color: "rgba(255,255,255,0.88)", lineHeight: 1.15, marginBottom: 20 }}>
              Luxury Properties in{" "}
              <em style={{ fontStyle: "italic", color: "#D4AF37" }}>Mumbai</em>
            </h1>
            <p style={{ fontSize: "clamp(0.95rem,1.5vw,1.1rem)", color: "rgba(255,255,255,0.55)", fontWeight: 300, maxWidth: 560 }}>
              Curated residential and commercial spaces from Churchgate to Borivali
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── NEW & UPCOMING PROJECTS ── */}
      {newProjects.length > 0 && (
        <section ref={newRef} style={{ background: "#0a0a0c", padding: "clamp(60px,8vh,100px) 0", borderTop: "1px solid rgba(212,175,55,0.06)" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={newInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: 40 }}>
              <span style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", display: "block", marginBottom: 10 }}>
                Curated Projects
              </span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "rgba(255,255,255,0.88)", lineHeight: 1.2, marginBottom: 8 }}>
                New &amp; Upcoming <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Projects</em>
              </h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 300, maxWidth: 480 }}>
                Developer-funded advisory — access to private site visits, pre-launch pricing, and exclusive inventory at no cost to you.
              </p>
            </motion.div>

            {/* Status legend */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
              {[
                { status: "new_launch", label: "New Launch" },
                { status: "under_construction", label: "Under Construction" },
                { status: "ready_to_move", label: "Ready to Move" },
              ].map(s => (
                <div key={s.status} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <StatusBadge status={s.status} />
                </div>
              ))}
            </div>

            <div className="new-projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {newProjects.map((project, i) => (
                <NewProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={newInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }} style={{ marginTop: 40, textAlign: "center" }}>
              <Link href="/contact?interest=real_estate" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "1px solid rgba(212,175,55,0.35)", color: "#D4AF37",
                fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "12px 28px", textDecoration: "none", transition: "background 0.3s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                Book a Private Consultation for All Projects →
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <div style={{ position: "sticky", top: 80, zIndex: 50, background: "rgba(10,10,12,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,175,55,0.06)", padding: "16px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <select style={selectStyle} value={currentParams.location || ""} onChange={e => updateFilter("location", e.target.value)}>
            <option value="">All Locations</option>
            <option value="South Mumbai">South Mumbai</option>
            <option value="Worli">Worli</option>
            <option value="Lower Parel">Lower Parel</option>
            <option value="Prabhadevi">Prabhadevi</option>
            <option value="Bandra East">Bandra East</option>
            <option value="Khar West">Khar West</option>
            <option value="Andheri East">Andheri East</option>
            <option value="Borivali">Borivali</option>
            <option value="Second Homes">Second Homes</option>
          </select>
          <select style={selectStyle} value={currentParams.type || ""} onChange={e => updateFilter("type", e.target.value)}>
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
          </select>
          <select style={selectStyle} value={currentParams.budget || ""} onChange={e => updateFilter("budget", e.target.value)}>
            <option value="">All Budgets</option>
            <option value="1-3">₹1–3 Cr</option>
            <option value="3-5">₹3–5 Cr</option>
            <option value="5-10">₹5–10 Cr</option>
            <option value="10+">₹10 Cr+</option>
          </select>
          {total > 0 && (
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", marginLeft: "auto" }}>
              {total} {total === 1 ? "property" : "properties"}
            </span>
          )}
        </div>
      </div>

      {/* Property Grid */}
      <section ref={gridRef} style={{ background: "#111114", padding: "clamp(60px,8vh,100px) 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
          {properties.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={gridInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.8rem", color: "rgba(255,255,255,0.88)", marginBottom: 20 }}>No Properties Found</div>
              <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
                Our curated property collection is being prepared. Connect with us for immediate personalised recommendations.
              </p>
              <Link href="/contact" style={{ background: "#D4AF37", color: "#0a0a0c", padding: "12px 28px", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-block" }}>
                Connect With Us
              </Link>
            </motion.div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="property-grid">
                {properties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
              {totalPages > 1 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 60 }}>
                  <button onClick={() => updateFilter("page", String(currentPage - 1))} disabled={currentPage <= 1}
                    style={{ background: "transparent", border: "1px solid rgba(212,175,55,0.3)", color: currentPage <= 1 ? "rgba(255,255,255,0.2)" : "#D4AF37", padding: "10px 20px", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", cursor: currentPage <= 1 ? "not-allowed" : "pointer" }}>
                    ← Previous
                  </button>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Page {currentPage} of {totalPages}</span>
                  <button onClick={() => updateFilter("page", String(currentPage + 1))} disabled={currentPage >= totalPages}
                    style={{ background: "transparent", border: "1px solid rgba(212,175,55,0.3)", color: currentPage >= totalPages ? "rgba(255,255,255,0.2)" : "#D4AF37", padding: "10px 20px", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", cursor: currentPage >= totalPages ? "not-allowed" : "pointer" }}>
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .property-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .new-projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .property-grid { grid-template-columns: 1fr !important; }
          .new-projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
