"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const advantages = [
  {
    title: "Accurate Market Valuation",
    description:
      "We analyse recent comparable transactions and current demand to price your property to sell — not to sit.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.2">
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      </svg>
    ),
  },
  {
    title: "Qualified Buyer Network",
    description:
      "Direct access to our 7,000+ HNI database, pre-qualified buyers actively looking in your price bracket.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.2">
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <path d="M16 3.13a4 4 0 010 7.75" />
        <path d="M21 21v-2a4 4 0 00-3-3.85" />
      </svg>
    ),
  },
  {
    title: "Complete Confidentiality",
    description:
      "Discreet marketing for privacy-conscious sellers. Your listing never appears on generic portals without your explicit approval.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: "Zero Upfront Cost",
    description:
      "No listing fees. No marketing charges. You pay only on successful sale, as a pre-agreed percentage.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
];

const steps = [
  { step: "01", title: "Property Assessment", desc: "We visit your property and understand your timeline, expectations, and any special considerations." },
  { step: "02", title: "Market Positioning", desc: "We research comparable transactions to determine the optimal asking price — firm enough for credibility, fair enough to attract serious buyers." },
  { step: "03", title: "Targeted Marketing", desc: "We introduce your property to our pre-qualified HNI buyer database. Off-market by default, public listing only with your approval." },
  { step: "04", title: "Negotiation & Closure", desc: "We handle all negotiations, coordination with lawyers, and documentation until the sale deed is executed and funds are transferred." },
];

const faqs = [
  {
    q: "How long does selling a property typically take?",
    a: "Timeline depends heavily on your price expectations relative to market. A well-priced luxury property in an active micro-market typically moves in 6–12 weeks. Properties requiring mortgage financing take somewhat longer due to bank processing times.",
  },
  {
    q: "Do you market my property publicly?",
    a: "Only with your explicit consent and after discussing what level of visibility suits your privacy requirements. Many of our seller clients prefer quiet, off-market introductions to known buyers rather than public listings.",
  },
  {
    q: "What is your facilitation fee for selling?",
    a: "Our fee on property sales is a pre-agreed percentage of the successful sale price, discussed and confirmed in writing before we begin marketing. There are no upfront costs — we only earn when you do.",
  },
  {
    q: "Do you handle all the paperwork?",
    a: "We coordinate with your lawyer on sale deed documentation, RERA compliance, and transfer formalities. We also liaise with the buyer's bank if they are taking a home loan. You focus on the decision; we handle the administration.",
  },
  {
    q: "Can you help me understand the tax implications of selling?",
    a: "We provide general guidance on capital gains tax and TDS obligations, and refer you to our empanelled Chartered Accountants for precise tax planning before you finalise your decision to sell.",
  },
];

export default function SellPropertyContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    location: "",
    configuration: "",
    carpetArea: "",
    floor: "",
    expectedPrice: "",
    ownershipStatus: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const advantagesRef = useRef(null);
  const advantagesInView = useInView(advantagesRef, { once: true, amount: 0.2 });
  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.2 });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, amount: 0.2 });
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, amount: 0.2 });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: "sell_property",
          message: `Location: ${formData.location} | Config: ${formData.configuration} | Area: ${formData.carpetArea} sqft | Floor: ${formData.floor} | Expected: ₹${formData.expectedPrice} Cr | Ownership: ${formData.ownershipStatus} | ${formData.message}`,
          source: "sell_property",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ location: "", configuration: "", carpetArea: "", floor: "", expectedPrice: "", ownershipStatus: "", name: "", phone: "", email: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#1a1a1f",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 6,
    color: "rgba(255,255,255,0.88)",
    padding: "12px 14px",
    fontSize: 14,
    fontFamily: "DM Sans, sans-serif",
    fontWeight: 300,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)",
    marginBottom: 8,
  };

  return (
    <div style={{ background: "#0a0a0c", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        ref={heroRef}
        style={{ padding: "clamp(80px,12vh,140px) 0", paddingTop: 140, background: "#0a0a0c" }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: 680 }}
          >
            <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 20 }}>
              Sell With Aurelion
            </div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2.4rem,5vw,3.8rem)",
                color: "rgba(255,255,255,0.88)",
                lineHeight: 1.15,
                marginBottom: 24,
              }}
            >
              Get the Best Price for Your{" "}
              <em style={{ fontStyle: "italic", color: "#D4AF37" }}>Luxury Property</em>
            </h1>
            <p style={{ fontSize: "clamp(0.95rem,1.5vw,1.1rem)", color: "rgba(255,255,255,0.55)", fontWeight: 300, lineHeight: 1.7 }}>
              Access our 7,000+ HNI buyer database, discreet off-market marketing, and end-to-end transaction management. Zero upfront cost.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section ref={advantagesRef} style={{ background: "#111114", padding: "clamp(80px,12vh,140px) 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={advantagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16 }}>
              Why Sell With Us
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "rgba(255,255,255,0.88)" }}>
              The Aurelion Advantage
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="advantages-grid">
            {advantages.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={advantagesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  backdropFilter: "blur(20px)",
                  padding: "32px 28px",
                }}
              >
                <div style={{ marginBottom: 20 }}>{adv.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "1.3rem",
                    color: "rgba(255,255,255,0.88)",
                    marginBottom: 12,
                  }}
                >
                  {adv.title}
                </h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontWeight: 300 }}>
                  {adv.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={stepsRef} style={{ background: "#0a0a0c", padding: "clamp(80px,12vh,140px) 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16 }}>
              How It Works
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "rgba(255,255,255,0.88)" }}>
              Our Process
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, position: "relative" }} className="steps-grid">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                style={{ position: "relative" }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    color: "rgba(212,175,55,0.15)",
                    marginBottom: 16,
                    lineHeight: 1,
                  }}
                >
                  {step.step}
                </div>
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: "#D4AF37",
                    marginBottom: 20,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "1.2rem",
                    color: "rgba(255,255,255,0.88)",
                    marginBottom: 12,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontWeight: 300 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller Form */}
      <section ref={formRef} style={{ background: "#111114", padding: "clamp(80px,12vh,140px) 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16 }}>
              Get Started
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "rgba(255,255,255,0.88)" }}>
              Tell Us About Your Property
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              backdropFilter: "blur(20px)",
              padding: "40px",
            }}
          >
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ color: "#D4AF37", fontSize: "2rem", marginBottom: 16 }}>✦</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.5rem", color: "rgba(255,255,255,0.88)", marginBottom: 12 }}>
                  Thank You
                </h3>
                <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                  Our property advisor will be in touch within 24 hours to schedule a property assessment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-grid">
                  <div>
                    <label style={labelStyle}>Location / Area</label>
                    <input type="text" required style={inputStyle} value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. Worli, Bandra West" />
                  </div>
                  <div>
                    <label style={labelStyle}>Configuration</label>
                    <select required style={inputStyle} value={formData.configuration} onChange={e => setFormData({ ...formData, configuration: e.target.value })}>
                      <option value="">Select BHK</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                      <option value="5+ BHK">5+ BHK</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Carpet Area (sqft)</label>
                    <input type="text" style={inputStyle} value={formData.carpetArea} onChange={e => setFormData({ ...formData, carpetArea: e.target.value })} placeholder="e.g. 1200" />
                  </div>
                  <div>
                    <label style={labelStyle}>Floor</label>
                    <input type="text" style={inputStyle} value={formData.floor} onChange={e => setFormData({ ...formData, floor: e.target.value })} placeholder="e.g. 14th floor" />
                  </div>
                  <div>
                    <label style={labelStyle}>Expected Price (₹ Cr)</label>
                    <input type="text" required style={inputStyle} value={formData.expectedPrice} onChange={e => setFormData({ ...formData, expectedPrice: e.target.value })} placeholder="e.g. 4.5" />
                  </div>
                  <div>
                    <label style={labelStyle}>Ownership Status</label>
                    <select style={inputStyle} value={formData.ownershipStatus} onChange={e => setFormData({ ...formData, ownershipStatus: e.target.value })}>
                      <option value="">Select</option>
                      <option value="Sole Ownership">Sole Ownership</option>
                      <option value="Joint Ownership">Joint Ownership</option>
                      <option value="Company Owned">Company Owned</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input type="text" required style={inputStyle} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Full name" />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input type="tel" required style={inputStyle} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" style={inputStyle} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" />
                </div>
                <div>
                  <label style={labelStyle}>Additional Details</label>
                  <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Any specific timeline, possession status, or other details we should know?" />
                </div>

                {status === "error" && <p style={{ fontSize: 12, color: "#e57373" }}>Something went wrong. Please try again.</p>}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    background: "#D4AF37",
                    color: "#0a0a0c",
                    border: "none",
                    padding: "14px 28px",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 400,
                    opacity: status === "loading" ? 0.7 : 1,
                    alignSelf: "flex-start",
                  }}
                >
                  {status === "loading" ? "Submitting..." : "Request Property Assessment"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} style={{ background: "#0a0a0c", padding: "clamp(80px,12vh,140px) 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16 }}>
              Common Questions
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "rgba(255,255,255,0.88)" }}>
              Seller FAQ
            </h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    padding: "24px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: 16,
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "1.15rem",
                      color: openFaq === i ? "#D4AF37" : "rgba(255,255,255,0.88)",
                      transition: "color 0.2s",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span style={{ color: "#D4AF37", fontSize: "1.2rem", flexShrink: 0, transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: 24 }}>
                    <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontWeight: 300, fontSize: 15 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{ marginTop: 48, textAlign: "center" }}
          >
            <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 20, fontSize: 14 }}>
              Have a question not answered above?
            </p>
            <Link
              href="/contact"
              style={{
                background: "transparent",
                border: "1px solid rgba(212,175,55,0.4)",
                color: "#D4AF37",
                padding: "12px 28px",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Ask Us Directly
            </Link>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .advantages-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .advantages-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
