"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface DBTestimonial {
  id: number;
  content: string;
  designation: string | null;
  company: string | null;
  rating: number;
  category: string | null;
}

interface TestimonialItem {
  content: string;
  role: string;
  location: string;
  category: string;
}

const fallbackTestimonials: TestimonialItem[] = [
  { content: "The zero-cost advisory model was refreshing. Finally, someone who puts the client's interest first. The property we found exceeded our expectations in every way.", role: "Senior Executive, Financial Services", location: "South Mumbai", category: "Real Estate" },
  { content: "Professional, knowledgeable, and incredibly responsive. The technical evaluation gave me complete confidence in my purchase. Genuinely rare expertise in this market.", role: "Business Owner", location: "Bandra West", category: "Automobile" },
  { content: "Handling property purchase and insurance under one advisor saved me weeks of coordination. The attention to detail throughout the process was exceptional.", role: "Director, IT Services", location: "Powai", category: "Financial" },
  { content: "Swapnil's market knowledge is unparalleled. He identified an off-market listing that perfectly matched our requirements — something we'd been searching for over a year.", role: "Managing Director", location: "Juhu", category: "Real Estate" },
  { content: "The EMI structuring advice alone saved us significant money over the loan tenure. Truly holistic advisory that considers the full picture of your financial health.", role: "Entrepreneur", location: "BKC", category: "Financial" },
];

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <div style={{
      background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12,
      boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      backdropFilter: "blur(20px)",
      padding: "32px 36px",
      minWidth: 380,
      maxWidth: 420,
      flexShrink: 0,
    }}>
      {/* Gold quote icon */}
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", lineHeight: 1, color: "rgba(212,175,55,0.2)", marginBottom: 16, marginTop: -8 }}>&ldquo;</div>
      {/* Stars */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ color: "#D4AF37", fontSize: 13 }}>★</span>)}
      </div>
      {/* Content */}
      <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.7)", fontWeight: 300, marginBottom: 24 }}>
        &ldquo;{t.content}&rdquo;
      </p>
      {/* Attribution */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>— {t.role}</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{t.location}</p>
        </div>
        <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.25)", padding: "4px 10px" }}>{t.category}</span>
      </div>
    </div>
  );
}

export default function Testimonials({ dbTestimonials }: { dbTestimonials: DBTestimonial[] }) {
  const testimonials: TestimonialItem[] = dbTestimonials.length > 0
    ? dbTestimonials.map(t => ({
        content: t.content,
        role: t.designation || "Client",
        location: t.company || "Mumbai",
        category: t.category || "General",
      }))
    : fallbackTestimonials;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const items = [...testimonials, ...testimonials]; // duplicate for seamless loop

  return (
    <section style={{ background: "#111114", padding: "clamp(80px,12vh,140px) 0", overflow: "hidden" }}>
      {/* Top divider */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(212,175,55,0.06), transparent)", marginBottom: "clamp(80px,12vh,140px)" }} />

      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 56, padding: "0 clamp(24px,5vw,80px)" }}
        >
          <span style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", fontWeight: 400, display: "block", marginBottom: 12 }}>Client Stories</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem,4vw,3.5rem)", color: "rgba(255,255,255,0.88)" }}>
            Trusted by{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Mumbai&apos;s Finest</em>
          </h2>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 12, letterSpacing: "0.05em" }}>
            Representative testimonials · Names withheld for privacy
          </p>
        </motion.div>

        {/* Marquee — left fade */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 10, pointerEvents: "none", background: "linear-gradient(to right, #111114, transparent)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 10, pointerEvents: "none", background: "linear-gradient(to left, #111114, transparent)" }} />

          <div
            className="marquee-track"
            style={{ display: "flex", gap: 24, width: "max-content" }}
          >
            {items.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marqueeScroll 30s linear infinite;
          padding: 8px clamp(24px,5vw,80px) 8px;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
