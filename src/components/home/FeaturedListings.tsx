"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ── types ── */
interface DBProperty {
  id: number; title: string; slug: string; location: string;
  area: string | null; type: string; bedrooms: number | null; priceLabel: string | null; images: string | null;
}
interface DBVehicle {
  id: number; title: string; slug: string; year: number;
  variant: string | null; condition: string; priceLabel: string | null; images: string | null;
}

/* ── parse first image from JSON array string or comma-separated URLs ── */
function firstImage(raw: string | null): string | null {
  if (!raw) return null;
  const s = raw.trim();
  if (!s) return null;
  // Try JSON array first
  try {
    const arr = JSON.parse(s);
    if (Array.isArray(arr) && arr.length > 0) return String(arr[0]).trim() || null;
    if (typeof arr === "string" && arr.trim()) return arr.trim();
  } catch { /* not JSON */ }
  // Fall back: comma-separated plain URLs
  const first = s.split(",")[0]?.trim();
  return first || null;
}

/* ── gradient placeholders (no Unsplash) ── */
function PropertyPlaceholder() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
      background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)" }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M8 40V20L24 8L40 20V40H28V28H20V40H8Z" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.6"/>
      </svg>
      <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(212,175,55,0.4)" }}>Property Photo</span>
    </div>
  );
}

function VehiclePlaceholder() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
      background: "linear-gradient(135deg, #0d1f3c 0%, #0a1628 50%, #0d1f3c 100%)" }}>
      <svg width="52" height="32" viewBox="0 0 52 32" fill="none">
        <path d="M4 22H48M4 22L8 14H16L20 8H32L36 14H44L48 22M4 22V28H10V22M48 22V28H42V22M14 22V14M38 22V14" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        <circle cx="14" cy="26" r="3" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="38" cy="26" r="3" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6"/>
      </svg>
      <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(212,175,55,0.4)" }}>Vehicle Photo</span>
    </div>
  );
}

const fallbackProperties = [
  { id: 0, title: "Sea-Facing Penthouse", slug: "sea-facing-penthouse", location: "Worli, Mumbai", type: "Penthouse", bedrooms: 4, priceLabel: "From ₹12.5 Cr", area: "4,200 sq ft", images: null },
  { id: 0, title: "Sky Villa with Terrace", slug: "sky-villa-terrace", location: "Bandra West, Mumbai", type: "Villa", bedrooms: 5, priceLabel: "From ₹18 Cr", area: "5,800 sq ft", images: null },
  { id: 0, title: "Luxury Residence", slug: "luxury-residence-juhu", location: "Juhu, Mumbai", type: "Apartment", bedrooms: 3, priceLabel: "From ₹6.5 Cr", area: "2,100 sq ft", images: null },
];
const fallbackVehicles = [
  { id: 0, title: "Mercedes-Benz S-Class", slug: "mercedes-s-class", year: 2024, variant: "S 500 4MATIC", condition: "New", priceLabel: "₹2.15 Cr", images: null },
  { id: 0, title: "BMW 7 Series", slug: "bmw-7-series", year: 2023, variant: "740Li Pure Excellence", condition: "Pre-Owned", priceLabel: "₹1.45 Cr", images: null },
  { id: 0, title: "Porsche Cayenne", slug: "porsche-cayenne", year: 2024, variant: "Cayenne Coupé GTS", condition: "New", priceLabel: "₹2.8 Cr", images: null },
];

const cardStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 12,
  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
  backdropFilter: "blur(20px)",
  overflow: "hidden",
  transition: "transform 0.4s cubic-bezier(0.25,0.1,0.25,1), border-color 0.4s, box-shadow 0.4s",
};

function PropertyCard({ p }: { p: DBProperty }) {
  const [hov, setHov] = useState(false);
  const img = firstImage(p.images);
  return (
    <Link href={p.id ? `/real-estate/${p.slug}` : "/real-estate"}
      style={{ ...cardStyle, display: "block", transform: hov ? "translateY(-4px)" : "translateY(0)", borderColor: hov ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.06)", boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.3)" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ height: 300, position: "relative", overflow: "hidden", background: "#0a1628" }}>
        {img ? (
          <img src={img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.05)" : "scale(1)", transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1)", display: "block" }} />
        ) : (
          <PropertyPlaceholder />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(10,10,12,0.75) 100%)" }} />
        {p.id > 0 && <span style={{ position: "absolute", top: 16, left: 16, background: "#D4AF37", color: "#0a0a0c", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", fontWeight: 400, zIndex: 1 }}>Featured</span>}
      </div>
      <div style={{ padding: "20px 24px 24px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4AF37" }}>{p.type}</span>
          <span style={{ color: "rgba(212,175,55,0.3)" }}>·</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{p.bedrooms ? `${p.bedrooms} BHK` : "Luxury"}</span>
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.25rem", color: hov ? "#D4AF37" : "rgba(255,255,255,0.88)", transition: "color 0.4s", marginBottom: 4 }}>{p.title}</h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>{p.location}</p>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14 }}>
          <div>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Indicative Price</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#D4AF37" }}>{p.priceLabel || "Price on Request"}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Area</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{p.area || "—"}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function VehicleCard({ v }: { v: DBVehicle }) {
  const [hov, setHov] = useState(false);
  const img = firstImage(v.images);
  return (
    <Link href={v.id ? `/cars/${v.slug}` : "/cars"}
      style={{ ...cardStyle, display: "block", transform: hov ? "translateY(-4px)" : "translateY(0)", borderColor: hov ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.06)", boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.3)" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ height: 300, position: "relative", overflow: "hidden", background: "#0d1f3c" }}>
        {img ? (
          <img src={img} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.05)" : "scale(1)", transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1)", display: "block" }} />
        ) : (
          <VehiclePlaceholder />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(10,10,12,0.75) 100%)" }} />
        {v.id > 0 && <span style={{ position: "absolute", top: 16, left: 16, background: "#D4AF37", color: "#0a0a0c", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", fontWeight: 400, zIndex: 1 }}>Featured</span>}
        <span style={{ position: "absolute", top: 16, right: 16, border: `1px solid ${v.condition === "New" ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.2)"}`, color: v.condition === "New" ? "#D4AF37" : "rgba(255,255,255,0.5)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", zIndex: 1 }}>{v.condition}</span>
      </div>
      <div style={{ padding: "20px 24px 24px" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 6 }}>{v.year} · Luxury</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.25rem", color: hov ? "#D4AF37" : "rgba(255,255,255,0.88)", transition: "color 0.4s", marginBottom: 4 }}>{v.title}</h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>{v.variant}</p>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14 }}>
          <div>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Indicative Price</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 400, color: "#D4AF37" }}>{v.priceLabel || "Price on Request"}</p>
          </div>
          <span style={{ fontSize: 11, color: "#D4AF37", alignSelf: "flex-end" }}>View Details →</span>
        </div>
      </div>
    </Link>
  );
}

interface FeaturedListingsProps {
  dbProperties: DBProperty[];
  dbVehicles: DBVehicle[];
}

export default function FeaturedListings({ dbProperties, dbVehicles }: FeaturedListingsProps) {
  const properties = dbProperties.length > 0 ? dbProperties : fallbackProperties;
  const vehicles = dbVehicles.length > 0 ? dbVehicles : fallbackVehicles;
  const [tab, setTab] = useState<"properties" | "vehicles">("properties");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section style={{ background: "#111114", padding: "clamp(80px,12vh,140px) 0" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }} ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", fontWeight: 400 }}>Curated Collection</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem,4vw,3.5rem)", color: "rgba(255,255,255,0.88)", lineHeight: 1.2 }}>
              Featured <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Listings</em>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {(["properties", "vehicles"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "10px 24px", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                fontWeight: 400, background: "none", border: "none", cursor: "pointer",
                color: tab === t ? "#D4AF37" : "rgba(255,255,255,0.4)",
                borderBottom: tab === t ? "2px solid #D4AF37" : "2px solid transparent",
                marginBottom: -1, transition: "color 0.3s, border-color 0.3s",
                fontFamily: "var(--font-dm-sans)",
              }}>
                {t === "properties" ? "Properties" : "Vehicles"}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="listings-grid"
          >
            {tab === "properties"
              ? properties.map((p, i) => (
                  <motion.div key={`p-${p.id}-${i}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}>
                    <PropertyCard p={p} />
                  </motion.div>
                ))
              : vehicles.map((v, i) => (
                  <motion.div key={`v-${v.id}-${i}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}>
                    <VehicleCard v={v} />
                  </motion.div>
                ))
            }
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: "center", marginTop: 40 }}>
          <Link href={tab === "properties" ? "/real-estate" : "/cars"} style={{
            fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4AF37",
            border: "1px solid rgba(212,175,55,0.35)", padding: "12px 28px", display: "inline-flex",
            gap: 8, alignItems: "center", transition: "background 0.3s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            View All {tab === "properties" ? "Properties" : "Vehicles"} →
          </Link>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 900px) { .listings-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .listings-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
