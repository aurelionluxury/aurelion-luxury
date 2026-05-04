"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type FormState = {
  // Vehicle details
  make: string;
  vehicleModel: string;
  year: string;
  variant: string;
  mileage: string;
  color: string;
  expectedPrice: string;
  serviceHistory: string;
  // Contact
  name: string;
  phone: string;
  email: string;
};

const inputStyle: React.CSSProperties = {
  background: "#1a1a1f",
  border: "1px solid rgba(212,175,55,0.15)",
  color: "rgba(255,255,255,0.8)",
  padding: "10px 14px",
  width: "100%",
  fontSize: 13,
  fontWeight: 300,
  fontFamily: "inherit",
  outline: "none",
  borderRadius: 4,
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)",
  fontWeight: 300,
  marginBottom: 6,
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(212,175,55,0.5)'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: 32,
  cursor: "pointer",
};

// SVG icons
function WrenchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

const valueProps = [
  {
    icon: <WrenchIcon />,
    title: "Engineering Inspection",
    description:
      "Our expert evaluator brings an engineering background and 15+ years of hands-on experience with luxury vehicles to every assessment — mechanical condition, service history, body integrity. Accurate pricing starts with honest evaluation.",
  },
  {
    icon: <ChartIcon />,
    title: "Best Market Price",
    description:
      "We know what comparable vehicles have sold for in Mumbai over the last 6 months. No guessing. Your asking price is informed by real transaction data.",
  },
  {
    icon: <CheckIcon />,
    title: "Hassle-Free Transfer",
    description:
      "We handle RTO paperwork, insurance transfer, and documentation from end to end. The buyer gets a clean vehicle; you get a clean transaction.",
  },
  {
    icon: <PeopleIcon />,
    title: "HNI Buyer Network",
    description:
      "First priority to our 7,000+ registered HNI clients before any open-market activity. This keeps your sale private and often faster.",
  },
];

const steps = [
  {
    number: "01",
    title: "Vehicle Assessment",
    description: "We schedule a convenient time to inspect your car.",
  },
  {
    number: "02",
    title: "Professional Valuation",
    description: "You receive a detailed market-informed price report.",
  },
  {
    number: "03",
    title: "Targeted Introduction",
    description: "We present your vehicle to our vetted HNI buyer network.",
  },
  {
    number: "04",
    title: "Clean Transfer",
    description: "Documentation, payment, and handover handled completely.",
  },
];

function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      style={{
        background: "#0a0a0c",
        paddingTop: 140,
        paddingBottom: "clamp(80px,12vh,140px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px,5vw,80px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2.6rem,5.5vw,4.5rem)",
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.15,
            marginBottom: 24,
            maxWidth: 780,
          }}
        >
          Get the Best Price for Your{" "}
          <em style={{ color: "#D4AF37", fontStyle: "italic" }}>
            Luxury Vehicle
          </em>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            width: 48,
            height: 1,
            background: "linear-gradient(to right, #D4AF37, transparent)",
            marginBottom: 28,
            transformOrigin: "left",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: "clamp(15px,1.8vw,17px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
            fontWeight: 300,
            maxWidth: 560,
          }}
        >
          15+ years of engineering expertise means we price your car correctly
          — not conservatively. Our buyer network moves quality vehicles fast.
        </motion.p>
      </div>
    </section>
  );
}

function ValueProps() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      style={{
        background: "#111114",
        padding: "clamp(70px,10vh,120px) 0",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px,5vw,80px)",
        }}
      >
        <div className="value-props-grid">
          {valueProps.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                backdropFilter: "blur(20px)",
                padding: "32px 28px",
              }}
            >
              <div style={{ marginBottom: 20 }}>{prop.icon}</div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "1.3rem",
                  color: "rgba(255,255,255,0.88)",
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}
              >
                {prop.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 300,
                }}
              >
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      style={{
        background: "#0a0a0c",
        padding: "clamp(70px,10vh,120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px,5vw,80px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "clamp(40px,6vh,64px)" }}
        >
          <span
            style={{
              display: "block",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#D4AF37",
              fontWeight: 400,
              marginBottom: 16,
            }}
          >
            How It Works
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2rem,4vw,3rem)",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.2,
            }}
          >
            Four Steps to a Clean Sale
          </h2>
        </motion.div>

        <div className="process-row">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{ position: "relative", flex: 1 }}
              className="process-step"
            >
              {/* Dashed connector line (between steps) */}
              {i < steps.length - 1 && (
                <div
                  className="step-connector"
                  style={{
                    position: "absolute",
                    top: 28,
                    left: "calc(50% + 28px)",
                    right: "calc(-50% + 28px)",
                    height: 1,
                    borderTop: "1px dashed rgba(212,175,55,0.25)",
                  }}
                />
              )}

              {/* Step number (watermark) */}
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "3rem",
                  color: "rgba(212,175,55,0.15)",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {step.number}
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "1.15rem",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 300,
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SellForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const [form, setForm] = useState<FormState>({
    make: "",
    vehicleModel: "",
    year: "",
    variant: "",
    mileage: "",
    color: "",
    expectedPrice: "",
    serviceHistory: "",
    name: "",
    phone: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const vehicleDetails = [
      `Make: ${form.make}`,
      `Model: ${form.vehicleModel}`,
      `Year: ${form.year}`,
      form.variant ? `Variant: ${form.variant}` : null,
      form.mileage ? `Mileage: ${form.mileage} km` : null,
      form.color ? `Colour: ${form.color}` : null,
      form.expectedPrice ? `Expected Price: ₹${form.expectedPrice} Lakhs` : null,
      `Service History: ${form.serviceHistory}`,
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: "sell_car",
          message: vehicleDetails,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      ref={ref}
      style={{
        background: "#111114",
        padding: "clamp(70px,10vh,120px) 0",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px,5vw,80px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: 640,
            margin: "0 auto",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12,
            backdropFilter: "blur(20px)",
            padding: "clamp(28px,4vw,48px)",
          }}
        >
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "3rem",
                  color: "#D4AF37",
                  marginBottom: 16,
                  lineHeight: 1,
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "1.8rem",
                  color: "rgba(255,255,255,0.88)",
                  marginBottom: 16,
                }}
              >
                Enquiry Received
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  maxWidth: 380,
                  margin: "0 auto",
                }}
              >
                Thank you. We will review your vehicle details and reach out
                within 24 hours to schedule an assessment.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "1.6rem",
                  color: "rgba(255,255,255,0.88)",
                  marginBottom: 32,
                  lineHeight: 1.2,
                }}
              >
                Tell Us About Your Vehicle
              </h3>

              <div className="form-two-col">
                <div>
                  <label style={labelStyle}>Make</label>
                  <input
                    style={inputStyle}
                    placeholder="e.g. BMW"
                    value={form.make}
                    required
                    onChange={(e) => update("make", e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Model</label>
                  <input
                    style={inputStyle}
                    placeholder="e.g. 7 Series"
                    value={form.vehicleModel}
                    required
                    onChange={(e) => update("vehicleModel", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-two-col" style={{ marginTop: 16 }}>
                <div>
                  <label style={labelStyle}>Year</label>
                  <input
                    style={inputStyle}
                    placeholder="e.g. 2021"
                    type="number"
                    min="1990"
                    max="2026"
                    value={form.year}
                    required
                    onChange={(e) => update("year", e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Variant</label>
                  <input
                    style={inputStyle}
                    placeholder="e.g. 740Li DPE"
                    value={form.variant}
                    onChange={(e) => update("variant", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-two-col" style={{ marginTop: 16 }}>
                <div>
                  <label style={labelStyle}>Mileage (km)</label>
                  <input
                    style={inputStyle}
                    placeholder="e.g. 24000"
                    type="number"
                    min="0"
                    value={form.mileage}
                    onChange={(e) => update("mileage", e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Exterior Colour</label>
                  <input
                    style={inputStyle}
                    placeholder="e.g. Carbon Black"
                    value={form.color}
                    onChange={(e) => update("color", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-two-col" style={{ marginTop: 16, marginBottom: 24 }}>
                <div>
                  <label style={labelStyle}>Expected Price (₹ Lakhs)</label>
                  <input
                    style={inputStyle}
                    placeholder="e.g. 85"
                    type="number"
                    min="0"
                    value={form.expectedPrice}
                    onChange={(e) => update("expectedPrice", e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Service History</label>
                  <select
                    style={selectStyle}
                    value={form.serviceHistory}
                    required
                    onChange={(e) => update("serviceHistory", e.target.value)}
                  >
                    <option value="">Select…</option>
                    <option value="Authorised Service Centre">
                      Authorised Service Centre
                    </option>
                    <option value="Multi-Brand Service Centre">
                      Multi-Brand Service Centre
                    </option>
                    <option value="Irregular/Unknown">
                      Irregular / Unknown
                    </option>
                  </select>
                </div>
              </div>

              {/* Separator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(212,175,55,0.15)",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    fontWeight: 300,
                    whiteSpace: "nowrap",
                  }}
                >
                  Your Contact Details
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(212,175,55,0.15)",
                  }}
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Name *</label>
                <input
                  style={inputStyle}
                  placeholder="Your full name"
                  value={form.name}
                  required
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Phone *</label>
                <input
                  style={inputStyle}
                  placeholder="+91 98765 43210"
                  type="tel"
                  value={form.phone}
                  required
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Email (optional)</label>
                <input
                  style={inputStyle}
                  placeholder="your@email.com"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>

              {error && (
                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(255,100,100,0.8)",
                    marginBottom: 16,
                    fontWeight: 300,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: submitting ? "rgba(212,175,55,0.6)" : "#D4AF37",
                  color: "#0a0a0c",
                  border: "none",
                  width: "100%",
                  padding: "16px 24px",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  cursor: submitting ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  borderRadius: 2,
                  boxShadow: "0 8px 28px rgba(212,175,55,0.2)",
                  transition: "background 0.3s ease",
                }}
              >
                {submitting ? "Submitting…" : "Request Valuation"}
              </button>

              <p
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.25)",
                  fontWeight: 300,
                  marginTop: 16,
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                No upfront charges. You pay only on successful sale.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function SellCarContent() {
  return (
    <>
      <HeroSection />
      <ValueProps />
      <ProcessSection />
      <SellForm />

      <style>{`
        .value-props-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .process-row {
          display: flex;
          gap: clamp(24px, 4vw, 48px);
          align-items: flex-start;
        }
        .form-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 900px) {
          .value-props-grid {
            grid-template-columns: 1fr;
          }
          .process-row {
            flex-direction: column;
          }
          .step-connector {
            display: none;
          }
        }
        @media (max-width: 560px) {
          .form-two-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
