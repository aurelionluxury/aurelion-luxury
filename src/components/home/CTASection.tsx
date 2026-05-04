"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface CTAProps {
  eyebrow?: string;
  headline?: string;
  subtitle?: string;
  btn1Text?: string;
  btn1Link?: string;
  btn2Text?: string;
  btn2Link?: string;
}

export default function CTASection({
  eyebrow = "Begin Your Journey",
  headline = "Let's Find Your Perfect Match",
  subtitle = "A private consultation. No pressure. No fees. Just expert guidance tailored to your needs.",
  btn1Text = "Book a Private Consultation",
  btn1Link = "/contact",
  btn2Text = "Our Zero-Fee Model",
  btn2Link = "/brokerage",
}: CTAProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section style={{ position: "relative", padding: "clamp(80px,12vh,160px) 0", overflow: "hidden" }} ref={ref}>
      <div style={{ position: "absolute", inset: 0, background: "#0a1628" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1920&q=80" alt="" fill style={{ objectFit: "cover", opacity: 0.05 }} />
      </div>
      <div className="cta-glow" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(212,175,55,0.25), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(212,175,55,0.25), transparent)" }} />

      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{ width: 600, height: 600, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.04)", position: "absolute" }} />
        <div style={{ width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.06)", position: "absolute" }} />
        <div style={{ width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.05)", position: "absolute" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", textAlign: "center" }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", fontWeight: 400, display: "block", marginBottom: 24 }}
        >
          {eyebrow}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(2.5rem,5vw,4.5rem)", color: "#D4AF37", fontStyle: "italic", lineHeight: 1.15, marginBottom: 32 }}
        >
          {headline}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0.2, opacity: 0 }} animate={inView ? { scaleX: 1, opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.26 }}
          style={{ width: 48, height: 1, background: "linear-gradient(to right, transparent, #D4AF37, transparent)", margin: "0 auto 28px" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.34 }}
          style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", fontWeight: 300, maxWidth: 480, margin: "0 auto 40px" }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.42 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link href={btn1Link} style={{
            background: "#D4AF37", color: "#0a0a0c",
            fontWeight: 400, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "16px 36px", display: "inline-flex", alignItems: "center",
            boxShadow: "0 8px 32px rgba(212,175,55,0.2)",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
            fontFamily: "var(--font-dm-sans)",
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#E8D5A3"; el.style.boxShadow = "0 12px 40px rgba(212,175,55,0.3)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#D4AF37"; el.style.boxShadow = "0 8px 32px rgba(212,175,55,0.2)"; }}
          >
            {btn1Text}
          </Link>
          <Link href={btn2Link} style={{
            border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37",
            fontWeight: 400, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "16px 36px", display: "inline-flex", alignItems: "center",
            background: "transparent", transition: "background 0.3s ease, border-color 0.3s ease",
            fontFamily: "var(--font-dm-sans)",
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(212,175,55,0.06)"; el.style.borderColor = "rgba(212,175,55,0.6)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = "rgba(212,175,55,0.4)"; }}
          >
            {btn2Text}
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.55 }}
          style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: 36 }}
        >
          Available Mon–Sat · 10am–7pm IST · WhatsApp &amp; Phone
        </motion.p>
      </div>

      <style>{`
        @keyframes ctaMorph {
          0%, 100% { background: radial-gradient(ellipse 70% 60% at 20% 50%, rgba(212,175,55,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 80% 50%, rgba(212,175,55,0.04) 0%, transparent 60%); }
          50% { background: radial-gradient(ellipse 60% 70% at 30% 40%, rgba(212,175,55,0.05) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 70% 60%, rgba(212,175,55,0.05) 0%, transparent 60%); }
        }
        .cta-glow { animation: ctaMorph 10s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
