"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const goldGrad: React.CSSProperties = {
  background: "linear-gradient(135deg, #B8956A 0%, #E8D5A3 40%, #D4AF37 70%, #E8D5A3 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  display: "inline-block",
};

const stats = [
  { display: "15+", label: "Years Experience" },
  { display: "7,000+", label: "HNI Network" },
  { display: "₹0", label: "Cost to Client" },
  { display: "IRDAI", label: "Certified Advisor" },
];

interface BrandStoryProps {
  name?: string;
  title?: string;
  initial?: string;
  desc1?: string;
  desc2?: string;
  credentials?: string;
}

export default function BrandStory({
  name = "Swapnil",
  title = "Founder & Principal Advisor",
  initial: monogram = "S",
  desc1 = "With 15+ years in luxury automobile sales and a foundation in engineering, we bring technical precision to every recommendation.",
  desc2 = "IRDAI certified for insurance advisory. Developer & dealer funded — so our loyalty is always to you.",
  credentials = "Engineering,MBA,IRDAI Certified",
}: BrandStoryProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const credList = credentials.split(",").map((c) => c.trim()).filter(Boolean);

  return (
    <section style={{ background: "#0a0a0c", padding: "clamp(80px,12vh,140px) 0", position: "relative", overflow: "hidden" }} ref={ref}>
      {/* Subtle background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
          alt=""
          fill
          style={{ objectFit: "cover", opacity: 0.04 }}
          priority={false}
        />
      </div>

      {/* Top divider */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(212,175,55,0.06), transparent)", marginBottom: "clamp(80px,12vh,140px)", position: "relative", zIndex: 1 }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", position: "relative", zIndex: 1 }}>
        {/* Split layout */}
        <div style={{ display: "grid", gridTemplateColumns: "55fr 45fr", gap: 80, alignItems: "center" }} className="grid-cols-1-on-mobile">
          {/* Left — story */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease: "easeOut" }}>
            <span style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", fontWeight: 400, display: "block", marginBottom: 20 }}>Who We Are</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem,4vw,3.5rem)", lineHeight: 1.2, marginBottom: 24, color: "rgba(255,255,255,0.88)" }}>
              Built on Relationships &amp;{" "}
              <em style={{ ...goldGrad, fontStyle: "italic" }}>Results</em>
            </h2>
            <div style={{ width: 40, height: 1, background: "#D4AF37", marginBottom: 24, opacity: 0.6 }} />
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", fontWeight: 300, marginBottom: 16, maxWidth: 520 }}>
              {desc1}
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", fontWeight: 300, marginBottom: 32, maxWidth: 520 }}>
              {desc2}
            </p>
            {/* Credential pills */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {credList.map((c) => (
                <span key={c} style={{
                  fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
                  border: "1px solid rgba(212,175,55,0.25)", color: "#D4AF37",
                  padding: "6px 14px", fontWeight: 400,
                }}>{c}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — monogram */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <div style={{ position: "relative", width: 200, height: 200 }}>
              <div style={{ position: "absolute", inset: -12, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)" }} />
              <div style={{ width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.25)", background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.03) 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, position: "relative" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "4.5rem", ...goldGrad, lineHeight: 1 }}>{monogram}</span>
              </div>
              <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.08)" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>{name}</p>
              <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", opacity: 0.8 }}>{title}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>15+ Years in Luxury Markets</p>
            </div>
          </motion.div>
        </div>

        {/* Trust counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          style={{ marginTop: 72, borderTop: "1px solid rgba(212,175,55,0.08)", borderBottom: "1px solid rgba(212,175,55,0.08)", padding: "40px 0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}
          className="counter-grid"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: "easeOut" }}
              style={{ textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", padding: "0 24px" }}
            >
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.4rem", lineHeight: 1, marginBottom: 8, color: "#D4AF37" }}>
                <span style={goldGrad}>{s.display}</span>
              </p>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .grid-cols-1-on-mobile { grid-template-columns: 1fr !important; gap: 48px !important; }
          .counter-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .counter-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 20px 0 !important; }
        }
      `}</style>
    </section>
  );
}
