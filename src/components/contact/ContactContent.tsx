"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ─── constants ──────────────────────────────────────────────────── */
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

/* ─── types ──────────────────────────────────────────────────────── */
type ServiceType = "" | "real_estate" | "automobiles" | "financial_services";

interface FormData {
  name: string;
  phone: string;
  email: string;
  // real estate
  budget: string;
  propertyType: string;
  config: string;
  timeline: string;
  // automobiles
  buyOrSell: string;
  vehicleMake: string;
  bodyType: string;
  investmentRange: string;
  // financial services
  loanType: string;
  loanAmount: string;
  // shared
  message: string;
}

/* ─── svg icons ──────────────────────────────────────────────────── */
function BuildingIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="4" y="8" width="20" height="16" rx="1" stroke="rgba(212,175,55,0.7)" strokeWidth="1.3" fill="none" />
      <path d="M10 8V5h8v3" stroke="rgba(212,175,55,0.7)" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
      <rect x="11" y="16" width="6" height="8" stroke="rgba(212,175,55,0.5)" strokeWidth="1.1" fill="none" />
    </svg>
  );
}
function CarIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M5 15L7.5 10H20.5L23 15V20H5V15Z" stroke="rgba(212,175,55,0.7)" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
      <circle cx="9" cy="20" r="2.5" stroke="rgba(212,175,55,0.7)" strokeWidth="1.3" fill="none" />
      <circle cx="19" cy="20" r="2.5" stroke="rgba(212,175,55,0.7)" strokeWidth="1.3" fill="none" />
    </svg>
  );
}
function ShieldIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 4L5 8V14C5 19.5 9 24 14 25.5C19 24 23 19.5 23 14V8L14 4Z" stroke="rgba(212,175,55,0.7)" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
      <path d="M9.5 14L12.5 17L18.5 11" stroke="rgba(212,175,55,0.6)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 3h4l1.5 3.5-2 1.5c1 2 2.5 3.5 4.5 4.5l1.5-2L16 12v4c0 .5-.5 1-1 1C6 17 1 12 1 4c0-.5.5-1 1-1h1z" stroke="rgba(212,175,55,0.7)" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="10" rx="1" stroke="rgba(212,175,55,0.7)" strokeWidth="1.3" fill="none" />
      <path d="M2 5l7 5 7-5" stroke="rgba(212,175,55,0.7)" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="#25D366" strokeWidth="1.3" fill="rgba(37,211,102,0.08)" />
      <path d="M13.5 11.8c-.2-.1-1.2-.6-1.4-.6-.2-.1-.3-.1-.4.1-.1.2-.5.6-.6.8-.1.1-.2.1-.4 0-.2-.1-.8-.3-1.5-.9-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.3 0-.1 0-.3-.1-.4-.1-.1-.4-1.1-.6-1.4-.2-.3-.4-.3-.5-.3h-.4c-.1 0-.4.1-.6.3C7 7.7 6.5 8.2 6.5 9.2s.7 2 .8 2.1c.1.1 1.4 2.1 3.3 3 .5.2.8.3 1.1.4.5.1.9.1 1.2.1.4-.1 1.1-.5 1.3-1 .2-.5.2-.9.1-1-.1-.1-.2-.2-.4-.3z" fill="#25D366" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M5 14L11 20L23 8" stroke={gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── FadeIn ─────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── progress dots ─────────────────────────────────────────────── */
function ProgressDots({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
      {[1, 2, 3].map(n => (
        <div key={n} style={{
          width: 10, height: 10, borderRadius: "50%",
          background: step >= n ? gold : "transparent",
          border: `1.5px solid ${step >= n ? gold : "rgba(212,175,55,0.3)"}`,
          transition: "all 0.3s ease",
        }} />
      ))}
    </div>
  );
}

/* ─── service selection card ─────────────────────────────────────── */
interface ServiceCardProps {
  id: ServiceType;
  label: string;
  desc: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}
function ServiceSelectCard({ id, label, desc, icon, selected, onSelect }: ServiceCardProps) {
  return (
    <button
      onClick={onSelect}
      style={{
        background: selected ? "rgba(212,175,55,0.05)" : "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
        border: selected ? `1px solid ${gold}` : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        padding: "20px 16px",
        cursor: "pointer",
        textAlign: "center",
        transition: "all 0.25s ease",
        width: "100%",
        fontFamily: "inherit",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>{icon}</div>
      <p style={{ fontSize: 13, color: selected ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.7)", fontWeight: 300, marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 300, lineHeight: 1.5 }}>
        {desc}
      </p>
    </button>
  );
}

/* ─── multi-step form ────────────────────────────────────────────── */
function MultiStepForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState<ServiceType>("");
  const [formData, setFormData] = useState<FormData>({
    name: "", phone: "", email: "",
    budget: "", propertyType: "", config: "", timeline: "",
    buyOrSell: "", vehicleMake: "", bodyType: "", investmentRange: "",
    loanType: "", loanAmount: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData(p => ({ ...p, [field]: e.target.value }));

  const inputStyle: React.CSSProperties = {
    background: "#1a1a1f",
    border: "1px solid rgba(212,175,55,0.12)",
    color: "rgba(255,255,255,0.8)",
    padding: "11px 14px",
    outline: "none",
    width: "100%",
    fontWeight: 300,
    marginBottom: 12,
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    fontFamily: "inherit",
    fontSize: 14,
    boxSizing: "border-box" as const,
    borderRadius: 0,
    transition: "border-color 0.2s ease",
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = gold;
  };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.12)";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const extraData = selectedService === "real_estate"
        ? { budget: formData.budget, propertyType: formData.propertyType, config: formData.config, timeline: formData.timeline }
        : selectedService === "automobiles"
        ? { buyOrSell: formData.buyOrSell, vehicleMake: formData.vehicleMake, bodyType: formData.bodyType, investmentRange: formData.investmentRange }
        : { loanType: formData.loanType, loanAmount: formData.loanAmount };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: selectedService,
          message: `${formData.message}\n\n${JSON.stringify(extraData, null, 2)}`.trim(),
          budget: selectedService === "automobiles" ? (formData.investmentRange || null) : null,
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", padding: "48px 24px" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
          style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <CheckIcon />
        </motion.div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
          fontSize: "1.8rem", color: "rgba(255,255,255,0.9)", marginBottom: 12,
        }}>
          Message Sent
        </h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 300, lineHeight: 1.75, maxWidth: 360, margin: "0 auto" }}>
          We will reach out within 2 hours during business hours (Mon–Sat, 10am–7pm IST).
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <ProgressDots step={step} />

      <AnimatePresence mode="wait">
        {/* ── Step 1: Service Selection ── */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "1.5rem", color: "rgba(255,255,255,0.88)", marginBottom: 24,
            }}>
              I&apos;m looking for&hellip;
            </h3>
            <div className="service-select-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              <ServiceSelectCard
                id="real_estate" label="Real Estate" desc="Properties, land, investment"
                icon={<BuildingIcon />}
                selected={selectedService === "real_estate"}
                onSelect={() => { setSelectedService("real_estate"); setStep(2); }}
              />
              <ServiceSelectCard
                id="automobiles" label="Automobiles" desc="Buy, sell, or maintain"
                icon={<CarIcon />}
                selected={selectedService === "automobiles"}
                onSelect={() => { setSelectedService("automobiles"); setStep(2); }}
              />
              <ServiceSelectCard
                id="financial_services" label="Financial Services" desc="Loans & insurance"
                icon={<ShieldIcon />}
                selected={selectedService === "financial_services"}
                onSelect={() => { setSelectedService("financial_services"); setStep(2); }}
              />
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Contact Details ── */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "1.5rem", color: "rgba(255,255,255,0.88)", marginBottom: 24,
            }}>
              Your Details
            </h3>
            <input className="contact-input" placeholder="Full Name *" required
              value={formData.name} onChange={set("name")} onFocus={focus} onBlur={blur} />
            <input className="contact-input" placeholder="Phone Number *" required type="tel"
              value={formData.phone} onChange={set("phone")} onFocus={focus} onBlur={blur} />
            <input className="contact-input" placeholder="Email Address (optional)" type="email"
              value={formData.email} onChange={set("email")} onFocus={focus} onBlur={blur} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 300,
                  fontFamily: "inherit", padding: "8px 0",
                }}
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  if (!formData.name || !formData.phone) return;
                  setStep(3);
                }}
                style={{
                  background: gold, color: "#0a0a0c",
                  border: "none", cursor: "pointer",
                  fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                  fontWeight: 400, padding: "12px 28px", fontFamily: "inherit",
                  transition: "background 0.25s ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#E8D5A3"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = gold; }}
              >
                Continue →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Service-specific fields ── */}
        {step === 3 && (
          <motion.form
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
          >
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "1.5rem", color: "rgba(255,255,255,0.88)", marginBottom: 24,
            }}>
              {selectedService === "real_estate" && "Property Requirements"}
              {selectedService === "automobiles" && "Vehicle Details"}
              {selectedService === "financial_services" && "Financial Requirements"}
            </h3>

            {/* Real Estate fields */}
            {selectedService === "real_estate" && (
              <>
                <select className="contact-input" value={formData.budget} onChange={set("budget")} onFocus={focus} onBlur={blur}>
                  <option value="">Budget Range</option>
                  <option>Below ₹1 Cr</option>
                  <option>₹1–3 Cr</option>
                  <option>₹3–5 Cr</option>
                  <option>₹5–10 Cr</option>
                  <option>₹10 Cr+</option>
                </select>
                <select className="contact-input" value={formData.propertyType} onChange={set("propertyType")} onFocus={focus} onBlur={blur}>
                  <option value="">Property Type</option>
                  <option>Apartment</option>
                  <option>Penthouse</option>
                  <option>Villa</option>
                  <option>Commercial</option>
                  <option>Any</option>
                </select>
                <select className="contact-input" value={formData.config} onChange={set("config")} onFocus={focus} onBlur={blur}>
                  <option value="">Configuration</option>
                  <option>2 BHK</option>
                  <option>3 BHK</option>
                  <option>4 BHK</option>
                  <option>5+ BHK</option>
                  <option>Any</option>
                </select>
                <select className="contact-input" value={formData.timeline} onChange={set("timeline")} onFocus={focus} onBlur={blur}>
                  <option value="">Timeline</option>
                  <option>Immediate</option>
                  <option>3–6 Months</option>
                  <option>6–12 Months</option>
                  <option>Just Exploring</option>
                </select>
                <textarea className="contact-input" placeholder="Any specific requirements or areas in mind?" rows={3}
                  value={formData.message} onChange={set("message")} onFocus={focus} onBlur={blur} style={{ resize: "vertical" }} />
              </>
            )}

            {/* Automobiles fields */}
            {selectedService === "automobiles" && (
              <>
                <select className="contact-input" value={formData.buyOrSell} onChange={set("buyOrSell")} onFocus={focus} onBlur={blur}>
                  <option value="">Looking to...</option>
                  <option>Buy a Car</option>
                  <option>Sell My Car</option>
                  <option>Both</option>
                </select>
                <input className="contact-input" placeholder="Preferred Make / Model (optional)"
                  value={formData.vehicleMake} onChange={set("vehicleMake")} onFocus={focus} onBlur={blur} />
                <select className="contact-input" value={formData.bodyType} onChange={set("bodyType")} onFocus={focus} onBlur={blur}>
                  <option value="">Body Type</option>
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Sports</option>
                  <option>Any</option>
                </select>
                <select className="contact-input" value={formData.investmentRange} onChange={set("investmentRange")} onFocus={focus} onBlur={blur}>
                  <option value="">Investment Consideration</option>
                  <option>₹10L - ₹25L</option>
                  <option>₹25L - ₹50L</option>
                  <option>₹50L - ₹1 Cr</option>
                  <option>₹1 Cr - ₹2 Cr</option>
                  <option>₹2 Cr - ₹5 Cr</option>
                  <option>₹5 Cr - ₹10 Cr</option>
                  <option>₹10 Cr+</option>
                </select>
                <textarea className="contact-input" placeholder="Tell us more about your requirement" rows={3}
                  value={formData.message} onChange={set("message")} onFocus={focus} onBlur={blur} style={{ resize: "vertical" }} />
              </>
            )}

            {/* Financial Services fields */}
            {selectedService === "financial_services" && (
              <>
                <select className="contact-input" value={formData.loanType} onChange={set("loanType")} onFocus={focus} onBlur={blur}>
                  <option value="">Service Type</option>
                  <option>Home Loan</option>
                  <option>Car Loan</option>
                  <option>Term Insurance</option>
                  <option>Health Insurance</option>
                  <option>Motor Insurance</option>
                  <option>Other</option>
                </select>
                <input className="contact-input" placeholder="Approximate Requirement (e.g. ₹1.5 Cr home loan)"
                  value={formData.loanAmount} onChange={set("loanAmount")} onFocus={focus} onBlur={blur} />
                <textarea className="contact-input" placeholder="Any additional context" rows={3}
                  value={formData.message} onChange={set("message")} onFocus={focus} onBlur={blur} style={{ resize: "vertical" }} />
              </>
            )}

            {error && <p style={{ color: "#e05a5a", fontSize: 13, marginBottom: 12, fontWeight: 300 }}>{error}</p>}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 300,
                  fontFamily: "inherit", padding: "8px 0",
                }}
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: submitting ? "rgba(212,175,55,0.5)" : gold,
                  color: "#0a0a0c", border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                  fontWeight: 400, padding: "12px 28px", fontFamily: "inherit",
                  transition: "background 0.25s ease",
                }}
              >
                {submitting ? "Sending…" : "Send Message →"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── right column: direct contact info ──────────────────────────── */
interface ContactInfoProps {
  phone: string;
  whatsapp: string;
  email: string;
  address?: string;
  timing?: string;
  branches?: { city: string; address: string; phone: string; email: string }[];
}

function ContactInfo({ phone, whatsapp, email, address, timing, branches }: ContactInfoProps) {
  const waNumber = whatsapp.replace(/\D/g, "");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Direct contact card */}
      <div style={{ ...glass, padding: 28 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: gold, marginBottom: 20, fontWeight: 400 }}>
          Direct Contact
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "flex-start", gap: 12, textDecoration: "none" }}
          >
            <div style={{ flexShrink: 0, marginTop: 2 }}><WhatsAppIcon /></div>
            <div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 300, marginBottom: 2 }}>
                {phone}
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>
                {timing || "Available Mon–Sat 10am–7pm"}
              </p>
            </div>
          </a>

          {/* Phone */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ flexShrink: 0, marginTop: 2 }}><PhoneIcon /></div>
            <div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 300 }}>
                {phone}
              </p>
            </div>
          </div>

          {/* Email */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ flexShrink: 0, marginTop: 2 }}><MailIcon /></div>
            <div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 300 }}>
                {email}
              </p>
            </div>
          </div>

          {/* Address */}
          {address && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1C6.24 1 4 3.24 4 6c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5zm0 6.75a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5z" fill="rgba(212,175,55,0.5)"/>
                </svg>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.5 }}>{address}</p>
            </div>
          )}
        </div>
      </div>

      {/* Branch offices */}
      {branches && branches.length > 0 && (
        <div style={{ ...glass, padding: 28 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: gold, marginBottom: 20, fontWeight: 400 }}>
            Our Offices
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {branches.map((b, i) => (
              <div key={i} style={{ paddingBottom: i < branches.length - 1 ? 16 : 0, borderBottom: i < branches.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <p style={{ fontSize: 13, color: gold, fontWeight: 400, marginBottom: 4 }}>{b.city}</p>
                {b.address && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 300, marginBottom: 2 }}>{b.address}</p>}
                {b.phone && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 300, marginBottom: 2 }}>{b.phone}</p>}
                {b.email && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>{b.email}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule card */}
      <div style={{ ...glass, padding: 28 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: gold, marginBottom: 12, fontWeight: 400 }}>
          Book a Consultation
        </p>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 300, lineHeight: 1.7, marginBottom: 20 }}>
          Schedule a 30-minute private call at a time that works for you.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              border: `1px solid ${gold}`,
              color: gold,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 400,
              padding: "11px 20px",
              textDecoration: "none",
              transition: "background 0.25s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            Chat on WhatsApp
          </a>
          <a
            href={`mailto:${email}`}
            style={{
              display: "block",
              textAlign: "center",
              color: gold,
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 400,
              padding: "11px 20px",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            Email Us
          </a>
        </div>
      </div>

      {/* Privacy note */}
      <p style={{
        fontSize: 12,
        color: "rgba(255,255,255,0.3)",
        fontWeight: 300,
        fontStyle: "italic",
        lineHeight: 1.65,
        paddingTop: 4,
      }}>
        Your information is completely confidential. We never share personal details without your explicit consent.
      </p>
    </div>
  );
}

/* ─── main component ─────────────────────────────────────────────── */
interface ContactContentProps {
  phone: string;
  whatsapp: string;
  email: string;
  address?: string;
  timing?: string;
  branches?: { city: string; address: string; phone: string; email: string }[];
}

export default function ContactContent({ phone, whatsapp, email, address, timing, branches }: ContactContentProps) {
  return (
    <main style={{ background: "#0a0a0c", minHeight: "100vh" }}>
      <style>{`
        .contact-input {
          background: #1a1a1f;
          border: 1px solid rgba(212,175,55,0.12);
          color: rgba(255,255,255,0.8);
          padding: 11px 14px;
          outline: none;
          width: 100%;
          font-weight: 300;
          margin-bottom: 12px;
          appearance: none;
          -webkit-appearance: none;
          font-family: inherit;
          font-size: 14px;
          box-sizing: border-box;
          border-radius: 0;
          transition: border-color 0.2s ease;
          display: block;
        }
        .contact-input:focus { border-color: #D4AF37; }
        .contact-input option { background: #1a1a1f; }
        textarea.contact-input { resize: vertical; }
        @media (max-width: 900px) {
          .contact-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .service-select-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ background: "#0a0a0c", paddingTop: 140, paddingBottom: "clamp(60px,8vh,100px)", position: "relative", overflow: "hidden" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
            alt="Luxury consultation space"
            fill
            style={{ objectFit: "cover", opacity: 0.06 }}
          />
        </div>
        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "linear-gradient(to bottom, rgba(10,10,12,0.85), rgba(10,10,12,0.7))",
          }}
        />
        <div style={{ ...container, position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{
              fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
              color: gold, fontWeight: 400, marginBottom: 20,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
              Private Consultation
              <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(2.8rem,6vw,5rem)", lineHeight: 1.12,
              color: "rgba(255,255,255,0.88)", marginBottom: 20, maxWidth: 600,
            }}
          >
            Let&apos;s{" "}
            <em style={{ color: gold, fontStyle: "italic" }}>Connect</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 520 }}
          >
            Tell us what you are looking for. A single conversation changes everything —{" "}
            <span style={{ color: "rgba(255,255,255,0.85)" }}>and costs nothing.</span>
          </motion.p>
        </div>
      </section>

      {/* ── Main form + contact info ── */}
      <section style={{ background: "#111114", padding: "clamp(80px,12vh,140px) 0" }}>
        <div style={container}>
          <FadeIn>
            <div
              className="contact-main-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "58fr 42fr",
                gap: 64,
                alignItems: "start",
              }}
            >
              {/* Left: Multi-step form */}
              <div style={{ ...glass, padding: 40 }}>
                <MultiStepForm />
              </div>

              {/* Right: Contact info */}
              <ContactInfo phone={phone} whatsapp={whatsapp} email={email} address={address} timing={timing} branches={branches} />
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
