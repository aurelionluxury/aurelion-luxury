"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const goldGrad: React.CSSProperties = {
  background: "linear-gradient(135deg, #B8956A 0%, #E8D5A3 40%, #D4AF37 70%, #E8D5A3 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function BentoCard({ children, style, href }: { children: React.ReactNode; style?: React.CSSProperties; href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={href}
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        border: `1px solid ${hov ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 12,
        boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.45)" : "0 4px 24px rgba(0,0,0,0.3)",
        backdropFilter: "blur(20px)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.25,0.1,0.25,1), border-color 0.4s, box-shadow 0.4s",
        padding: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
        textDecoration: "none",
        ...style,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Hover glow */}
      <div style={{ position: "absolute", inset: 0, opacity: hov ? 1 : 0, transition: "opacity 0.4s", background: "radial-gradient(ellipse at 30% 30%, rgba(212,175,55,0.04) 0%, transparent 60%)", pointerEvents: "none" }} />
      {children}
    </Link>
  );
}

export default function ServicesBento() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section style={{ background: "#0a0a0c", padding: "clamp(80px,12vh,140px) 0" }}>
      {/* Top divider */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(212,175,55,0.06), transparent)", marginBottom: "clamp(80px,12vh,140px)" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }} ref={ref}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ marginBottom: 48 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", fontWeight: 400, display: "block", marginBottom: 12 }}>Our Expertise</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem,4vw,3.5rem)", color: "rgba(255,255,255,0.88)" }}>
            Three Pillars of <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Excellence</em>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gridTemplateRows: "1fr 1fr", gap: 24, minHeight: 520 }} className="bento-grid">
          {/* LEFT LARGE — Real Estate (spans 2 rows) */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ gridRow: "1 / 3" }}>
            <BentoCard href="/real-estate" style={{ height: "100%", minHeight: 480 }}>
              {/* Background image */}
              <div style={{ position: "absolute", inset: 0, borderRadius: 12, overflow: "hidden", zIndex: 0 }}>
                <Image src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" alt="" fill style={{ objectFit: "cover", opacity: 0.1 }} />
              </div>
              {/* Background decoration */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(10,22,40,0.92) 0%, rgba(10,10,12,0.96) 100%)", borderRadius: 12 }} />
              <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "100%", background: "radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.06) 0%, transparent 55%)", borderRadius: 12 }} />

              {/* Large watermark number */}
              <div style={{ position: "absolute", top: 20, right: 24, fontFamily: "'Cormorant Garamond', serif", fontSize: "7rem", fontWeight: 300, color: "rgba(212,175,55,0.05)", lineHeight: 1, userSelect: "none" }}>01</div>

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Icon */}
                <div style={{ width: 52, height: 52, border: "1px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.7)" strokeWidth="1">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </div>
                {/* Gold line */}
                <div style={{ width: 32, height: 1, background: "#D4AF37", opacity: 0.5, marginBottom: 16 }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2rem", color: "rgba(255,255,255,0.88)", marginBottom: 6 }}>Luxury Real Estate</h3>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", opacity: 0.8, marginBottom: 20 }}>Churchgate to Borivali</p>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", fontWeight: 300, maxWidth: 360, marginBottom: 32 }}>
                  Curated residential &amp; commercial spaces across Mumbai. New construction projects from top developers, with exclusive off-market access.
                </p>
                <span style={{ fontSize: 12, letterSpacing: "0.1em", color: "#D4AF37", display: "flex", alignItems: "center", gap: 6 }}>
                  Learn More <span>→</span>
                </span>
              </div>
            </BentoCard>
          </motion.div>

          {/* TOP RIGHT — Automobiles */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} style={{ minHeight: 220 }}>
            <BentoCard href="/cars" style={{ height: "100%", minHeight: 220 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 12, overflow: "hidden", zIndex: 0 }}>
                <Image src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80" alt="" fill style={{ objectFit: "cover", opacity: 0.1 }} />
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(13,31,60,0.92) 0%, rgba(10,10,12,0.96) 100%)", borderRadius: 12 }} />
              <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", fontWeight: 300, color: "rgba(212,175,55,0.05)", lineHeight: 1, userSelect: "none" }}>02</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, border: "1px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(212,175,55,0.7)">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                  </div>
                </div>
                <div style={{ width: 28, height: 1, background: "#D4AF37", opacity: 0.5, marginBottom: 12 }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.5rem", color: "rgba(255,255,255,0.88)", marginBottom: 4 }}>Exotic Automobiles</h3>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", opacity: 0.8, marginBottom: 12 }}>Buy · Sell · Maintain</p>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.45)", fontWeight: 300, marginBottom: 16 }}>Technical evaluation, market pricing, complete paperwork.</p>
                <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "#D4AF37" }}>Learn More →</span>
              </div>
            </BentoCard>
          </motion.div>

          {/* BOTTOM RIGHT — Financial */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} style={{ minHeight: 220 }}>
            <BentoCard href="/financial-services" style={{ height: "100%", minHeight: 220 }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(0,20,10,0.9) 0%, rgba(10,10,12,0.95) 100%)", borderRadius: 12 }} />
              <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", fontWeight: 300, color: "rgba(212,175,55,0.05)", lineHeight: 1, userSelect: "none" }}>03</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, border: "1px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.7)" strokeWidth="1">
                      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                  </div>
                </div>
                <div style={{ width: 28, height: 1, background: "#D4AF37", opacity: 0.5, marginBottom: 12 }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.5rem", color: "rgba(255,255,255,0.88)", marginBottom: 4 }}>Financial Services</h3>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", opacity: 0.8, marginBottom: 12 }}>IRDAI Certified</p>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.45)", fontWeight: 300, marginBottom: 16 }}>Home loans, car loans, insurance — best rates negotiated for you.</p>
                <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "#D4AF37" }}>Learn More →</span>
              </div>
            </BentoCard>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bento-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .bento-grid > div:first-child { grid-row: auto !important; }
        }
      `}</style>
    </section>
  );
}
