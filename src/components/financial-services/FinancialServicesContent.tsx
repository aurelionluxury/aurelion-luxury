"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/* ─── shared constants ─────────────────────────────────────────── */
const gold = "#D4AF37";
const glass: React.CSSProperties = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 12,
  backdropFilter: "blur(20px)",
};
const container: React.CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "0 clamp(24px,5vw,80px)",
};
const sectionPad: React.CSSProperties = {
  padding: "clamp(80px,12vh,140px) 0",
};
const eyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: gold,
  fontWeight: 400,
  marginBottom: 20,
  display: "flex",
  alignItems: "center",
  gap: 12,
};

/* ─── SVG icons ─────────────────────────────────────────────────── */
function HouseIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M6 18L20 6L34 18V34H26V24H14V34H6V18Z" stroke="rgba(212,175,55,0.7)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function CarIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M8 22L12 14H28L32 22V28H8V22Z" stroke="rgba(212,175,55,0.7)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <circle cx="13" cy="28" r="3" stroke="rgba(212,175,55,0.7)" strokeWidth="1.5" fill="none" />
      <circle cx="27" cy="28" r="3" stroke="rgba(212,175,55,0.7)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 6L8 11V20C8 27.2 13.2 33.8 20 35.5C26.8 33.8 32 27.2 32 20V11L20 6Z" stroke="rgba(212,175,55,0.7)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M14 20L18 24L26 16" stroke="rgba(212,175,55,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4L19.09 12.26L28 13.27L21.5 19.41L23.18 28L16 24.02L8.82 28L10.5 19.41L4 13.27L12.91 12.26L16 4Z"
        stroke={gold} strokeWidth="1.5" strokeLinejoin="round" fill="rgba(212,175,55,0.1)" />
    </svg>
  );
}

/* ─── service cards data ─────────────────────────────────────────── */
const services = [
  {
    id: "home",
    icon: <HouseIcon />,
    title: "Home Loans",
    subtitle: "Negotiated with 8+ banking partners",
    bullets: [
      "Simultaneous applications to HDFC, SBI, ICICI, Kotak, Axis, PNB Housing, LIC Housing, Bank of Baroda",
      "We negotiate your personal rate — not the advertised rate",
      "Maximum LTV structuring to preserve your capital",
      "Doorstep documentation collection — no bank branch visits",
      "Balance transfer advisory for existing loans at better rates",
    ],
    note: "Typical benefit: 0.25–0.5% below standard quoted rates",
  },
  {
    id: "car",
    icon: <CarIcon />,
    title: "Car Loans",
    subtitle: "Structured for luxury vehicle buyers",
    bullets: [
      "Competitive rates from Kotak, HDFC, ICICI, Axis, L&T Finance",
      "Minimal documentation for clients with strong bank relationships",
      "Balloon payment structures for business car buyers",
      "Used car financing for select pre-owned luxury vehicles",
      "Pre-approved loan letter to strengthen your dealer negotiation",
    ],
    note: "",
  },
  {
    id: "insurance",
    icon: <ShieldIcon />,
    title: "Insurance Advisory",
    subtitle: "IRDAI regulated. Full transparency.",
    bullets: [
      "Term insurance analysis — settlement ratio, exclusions, claim process",
      "Health insurance structuring for individuals and families",
      "Critical illness and disability riders — assessed for genuine need",
      "Motor insurance: zero depreciation, OEM cashless garages",
      "Annual renewal reminders — we track expiry dates for you",
      "Claims assistance — we support you through the process",
    ],
    note: "",
  },
];

/* ─── form state type ──────────────────────────────────────────── */
interface FormData {
  name: string;
  phone: string;
  email: string;
  serviceInterest: string;
  requirement: string;
  message: string;
}

/* ─── animated section wrapper ──────────────────────────────────── */
function FadeIn({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── service card ───────────────────────────────────────────────── */
function ServiceCard({ svc, index }: { svc: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      style={{
        ...glass,
        padding: "36px 40px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
        alignItems: "start",
      }}
    >
      {/* Left: icon + title + subtitle */}
      <div>
        <div style={{ marginBottom: 16 }}>{svc.icon}</div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "clamp(1.6rem,3vw,2.1rem)",
          color: "rgba(255,255,255,0.92)",
          marginBottom: 8,
          lineHeight: 1.2,
        }}>
          {svc.title}
        </h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontWeight: 300, lineHeight: 1.6, marginBottom: 24 }}>
          {svc.subtitle}
        </p>
        {svc.note && (
          <div style={{
            borderLeft: `2px solid ${gold}`,
            paddingLeft: 14,
            fontSize: 12,
            color: "rgba(212,175,55,0.8)",
            fontWeight: 300,
            lineHeight: 1.6,
            marginTop: 8,
          }}>
            {svc.note}
          </div>
        )}
        <Link href="/contact" style={{
          display: "inline-block",
          marginTop: 28,
          background: gold,
          color: "#0a0a0c",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 400,
          padding: "11px 24px",
          textDecoration: "none",
          transition: "background 0.25s ease",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#E8D5A3"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = gold; }}
        >
          Enquire Now →
        </Link>
      </div>

      {/* Right: bullet points */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {svc.bullets.map((b, i) => (
          <li key={i} style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            marginBottom: 16,
            fontSize: 14,
            color: "rgba(255,255,255,0.65)",
            fontWeight: 300,
            lineHeight: 1.65,
          }}>
            <span style={{ color: gold, flexShrink: 0, marginTop: 2, fontSize: 11 }}>✦</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── enquiry form ───────────────────────────────────────────────── */
function EnquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "", phone: "", email: "", serviceInterest: "", requirement: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const inputStyle: React.CSSProperties = {
    background: "#1a1a1f",
    border: "1px solid rgba(212,175,55,0.15)",
    color: "rgba(255,255,255,0.8)",
    padding: "12px 16px",
    width: "100%",
    marginBottom: 12,
    fontWeight: 300,
    fontFamily: "inherit",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    borderRadius: 0,
    transition: "border-color 0.2s ease",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: "financial_services",
          message: `Service Interest: ${formData.serviceInterest}\nRequirement: ${formData.requirement}\n${formData.message}`,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "48px 24px" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "rgba(212,175,55,0.1)",
          border: "1px solid rgba(212,175,55,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12L9.5 16.5L19 7" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300, color: "rgba(255,255,255,0.9)", marginBottom: 12 }}>
          Thank you
        </p>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 300, lineHeight: 1.7 }}>
          We will reach out within 2 hours during business hours (Mon–Sat, 10am–7pm IST).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <input
          style={inputStyle}
          placeholder="Your Name *"
          required
          value={formData.name}
          onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
          onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = gold; }}
          onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.15)"; }}
        />
        <input
          style={inputStyle}
          placeholder="Phone Number *"
          required
          type="tel"
          value={formData.phone}
          onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
          onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = gold; }}
          onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.15)"; }}
        />
      </div>
      <input
        style={inputStyle}
        placeholder="Email (optional)"
        type="email"
        value={formData.email}
        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
        onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = gold; }}
        onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.15)"; }}
      />
      <select
        style={{ ...inputStyle, cursor: "pointer" }}
        value={formData.serviceInterest}
        onChange={e => setFormData(p => ({ ...p, serviceInterest: e.target.value }))}
        onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = gold; }}
        onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.15)"; }}
      >
        <option value="">Service Interest</option>
        <option value="Home Loan">Home Loan</option>
        <option value="Car Loan">Car Loan</option>
        <option value="Term Insurance">Term Insurance</option>
        <option value="Health Insurance">Health Insurance</option>
        <option value="Motor Insurance">Motor Insurance</option>
        <option value="Other">Other</option>
      </select>
      <input
        style={inputStyle}
        placeholder="Requirement (e.g. ₹1.5 Cr home loan)"
        value={formData.requirement}
        onChange={e => setFormData(p => ({ ...p, requirement: e.target.value }))}
        onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = gold; }}
        onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.15)"; }}
      />
      <textarea
        style={{ ...inputStyle, height: 100, resize: "vertical" as const }}
        placeholder="Additional message (optional)"
        value={formData.message}
        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
        onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = gold; }}
        onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.15)"; }}
      />
      {error && <p style={{ color: "#e05a5a", fontSize: 13, marginBottom: 12, fontWeight: 300 }}>{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        style={{
          background: submitting ? "rgba(212,175,55,0.5)" : gold,
          color: "#0a0a0c",
          border: "none",
          cursor: submitting ? "not-allowed" : "pointer",
          width: "100%",
          padding: "14px",
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 400,
          fontFamily: "inherit",
          transition: "background 0.25s ease",
        }}
      >
        {submitting ? "Sending…" : "Get a Quote →"}
      </button>
    </form>
  );
}

/* ─── main component ─────────────────────────────────────────────── */
export default function FinancialServicesContent() {
  return (
    <main style={{ background: "#0a0a0c", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ background: "#0a0a0c", paddingTop: 140, paddingBottom: "clamp(80px,10vh,120px)" }}>
        <div style={container}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div style={eyebrow}>
              <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
              IRDAI Certified Advisory
              <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2.8rem,6vw,5rem)",
              lineHeight: 1.12,
              color: "rgba(255,255,255,0.88)",
              marginBottom: 24,
              maxWidth: 700,
            }}
          >
            Wealth Protection &amp;{" "}
            <em style={{ color: gold, fontStyle: "italic" }}>Smart Financing</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            style={{
              color: "rgba(255,255,255,0.55)",
              fontWeight: 300,
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            We approach 8+ banking partners simultaneously to secure your best possible rate.{" "}
            <span style={{ color: "rgba(255,255,255,0.85)" }}>
              Advisory is always free — lenders and insurers pay us.
            </span>
          </motion.p>
        </div>
      </section>

      {/* ── IRDAI Badge ── */}
      <section style={{ background: "#0a0a0c", paddingBottom: "clamp(60px,8vh,100px)" }}>
        <div style={{ ...container, display: "flex", justifyContent: "center" }}>
          <FadeIn>
            <div style={{
              maxWidth: 400,
              border: "1px solid rgba(212,175,55,0.3)",
              background: "rgba(212,175,55,0.03)",
              padding: 24,
              borderRadius: 4,
              textAlign: "center",
            }}>
              <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
                <StarIcon />
              </div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.88)",
                marginBottom: 8,
                letterSpacing: "0.03em",
              }}>
                IRDAI Certified Insurance Advisor
              </p>
              <p style={{ fontSize: 12, color: "rgba(212,175,55,0.6)", letterSpacing: "0.08em", fontWeight: 300 }}>
                Insurance Regulatory &amp; Development Authority of India
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section style={{ background: "#111114", ...sectionPad }}>
        <div style={container}>
          <FadeIn style={{ marginBottom: 56 }}>
            <div style={eyebrow}>
              <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
              Our Services
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2rem,4vw,3rem)",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.2,
            }}>
              Comprehensive Financial Advisory
            </h2>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {services.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Enquiry Form ── */}
      <section style={{ background: "#0a0a0c", ...sectionPad }}>
        <div style={{ ...container, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FadeIn style={{ width: "100%", maxWidth: 560 }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ ...eyebrow, justifyContent: "center" }}>
                <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
                Zero Cost Advisory
                <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2rem,4vw,2.8rem)",
                color: "rgba(255,255,255,0.88)",
              }}>
                Get a Quote
              </h2>
            </div>
            <div style={{ ...glass, padding: "36px 40px" }}>
              <EnquiryForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mobile responsive override */}
      <style>{`
        @media (max-width: 768px) {
          .fs-service-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
