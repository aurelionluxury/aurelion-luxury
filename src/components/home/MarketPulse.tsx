"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { display: "41%", label: "Of Transactions Are Luxury", note: "Share of total Mumbai residential market" },
  { display: "8.5%", label: "Avg Annual Appreciation", note: "Luxury residential, Mumbai (5-yr avg)" },
  { display: "93,753+", label: "HNIs by 2028", note: "Knight Frank India Wealth Report" },
  { display: "20%", label: "Buyers Are NRIs", note: "Share of luxury segment, growing YoY" },
];

export default function MarketPulse() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section style={{ background: "#111114", padding: "clamp(80px,12vh,140px) 0" }} ref={ref}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", fontWeight: 400, display: "block", marginBottom: 12 }}>
            Mumbai Market Pulse
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.2rem,4vw,3.5rem)", color: "rgba(255,255,255,0.88)", lineHeight: 1.2 }}>
            The Numbers Behind the <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Opportunity</em>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="market-pulse-grid">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                backdropFilter: "blur(20px)",
                padding: "36px 28px",
                textAlign: "center",
              }}
            >
              <div style={{ width: 28, height: 2, background: "#D4AF37", margin: "0 auto 20px", opacity: 0.6 }} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(2.2rem,3vw,3rem)",
                  color: "#D4AF37",
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {s.display}
              </motion.p>
              <p style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontWeight: 400, marginBottom: 8 }}>
                {s.label}
              </p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>{s.note}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginTop: 32 }}
        >
          Updated quarterly from public market reports · Knight Frank · ANAROCK · JLL India
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 900px) { .market-pulse-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .market-pulse-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
