"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ─── design tokens ─────────────────────────────── */
const gold = "#D4AF37";
const textPrimary = "rgba(255,255,255,0.88)";
const textSecondary = "rgba(255,255,255,0.55)";
const textMuted = "rgba(255,255,255,0.35)";

const sectionPadding = "clamp(80px,12vh,140px) 0";
const container: React.CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "0 clamp(24px,5vw,80px)",
};

const eyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: gold,
  fontWeight: 400,
  fontFamily: "'DM Sans', sans-serif",
  marginBottom: 16,
};

const glassCard: React.CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 12,
  backdropFilter: "blur(20px)",
  padding: 32,
};

const goldDivider: React.CSSProperties = {
  height: 1,
  background:
    "linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)",
  margin: "32px 0",
};

/* ─── fade-up helper ─────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── SVG icons ─────────────────────────────────── */
function CameraIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={gold}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", flexShrink: 0 }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ─── data ───────────────────────────────────────── */
const stats = [
  { number: "8.5%", label: "Avg Annual Appreciation", sub: "Luxury Residential YoY" },
  { number: "93,753+", label: "HNIs", sub: "By 2028 (Knight Frank)" },
  { number: "20%", label: "Luxury Buyers Are NRIs", sub: "Of Mumbai transactions" },
];

const legalSteps = [
  {
    num: "01",
    title: "FEMA Compliance",
    body: "Most NRIs can purchase residential property in India freely under FEMA regulations. You do not need RBI approval for residential properties. Commercial property and agricultural land have separate rules — we will guide you through the specific guidelines applicable to your situation.",
  },
  {
    num: "02",
    title: "RERA Registration",
    body: "All new construction projects above a threshold must be registered under the Real Estate (Regulation and Development) Act. This protects buyers by ensuring developers adhere to approved plans and possession timelines. We only work with RERA-registered projects.",
  },
  {
    num: "03",
    title: "Documentation",
    body: "You will need: valid passport, PAN card (or undertaking), overseas address proof, and NRE/NRO account for fund transfer. For joint purchases, all co-buyers require the same documentation.",
  },
  {
    num: "04",
    title: "Power of Attorney",
    body: "If you cannot travel to India for registration, a registered Power of Attorney allows a trusted representative to execute documents on your behalf. We coordinate the entire process with our empanelled legal partners.",
  },
];

const taxPoints = [
  {
    title: "TDS on Purchase",
    body: "Buyers deduct TDS at 1% for residents (Section 194IA) or higher rates for NRI sellers as applicable. We help you understand your obligations before signing.",
  },
  {
    title: "Rental Income",
    body: "Rental income from Indian property is taxable in India. Rates depend on your total Indian income. DTAA treaties with your country of residence may reduce double taxation.",
  },
  {
    title: "Capital Gains",
    body: "Short-term gains (held < 24 months) are taxed as income. Long-term gains attract 12.5% without indexation benefit (post-July 2024 rules). Exemptions available under Section 54 on reinvestment in residential property.",
  },
];

const helpCards = [
  {
    icon: <CameraIcon />,
    title: "Virtual Site Visits",
    body: "We conduct detailed video walkthroughs of every property, including building common areas, views from each window, and the surrounding neighbourhood. You see exactly what you would see in person.",
  },
  {
    icon: <FileIcon />,
    title: "Documentation Coordination",
    body: "We coordinate with developers, your CA, your lawyer, and the registrar's office. You sign at your end; we handle everything at ours.",
  },
  {
    icon: <BankIcon />,
    title: "Bank Liaison",
    body: "From NRE/NRO account setup guidance to home loan processing at Indian banks, we manage the financial coordination so you do not need to be present.",
  },
  {
    icon: <HomeIcon />,
    title: "Possession & Handover",
    body: "When your property is ready, we inspect it on your behalf, document snags, coordinate corrections with the developer, and ensure you receive exactly what was promised.",
  },
];

const faqs = [
  {
    q: "Can I buy any type of property in India as an NRI?",
    a: "NRIs can freely purchase residential and commercial properties. Agricultural land, plantation property, and farmhouses require special permissions from the RBI and are generally not permitted for NRI purchase. We focus exclusively on residential and commercial luxury properties.",
  },
  {
    q: "Do I need to come to India to complete the purchase?",
    a: "With a properly executed Power of Attorney and digital document signing, you can complete most of the process remotely. You may need to be present for the original property registration in some states, though this too can sometimes be handled via PoA. We assess this case by case.",
  },
  {
    q: "How do I repatriate funds when I sell?",
    a: "Under FEMA regulations, NRIs can repatriate up to the original purchase price (in foreign exchange) and capital gains after tax. We coordinate with your bank and CA to ensure the repatriation is structured correctly and compliantly.",
  },
  {
    q: "What currency do I pay in?",
    a: "All Indian property transactions must be conducted in Indian Rupees. Funds should flow from an NRE or NRO account. Your overseas bank can facilitate wire transfers directly. We provide the exact payment instructions needed.",
  },
];

/* ─── accordion ──────────────────────────────────── */
function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "22px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 15,
            color: textPrimary,
            textAlign: "left",
          }}
        >
          {q}
        </span>
        <ChevronIcon open={open} />
      </button>
      <div
        style={{
          maxHeight: open ? 320 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            color: textSecondary,
            lineHeight: 1.85,
            padding: "0 0 24px",
            margin: 0,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

/* ─── disclaimer pill ────────────────────────────── */
function Disclaimer({ text }: { text: string }) {
  return (
    <p
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        fontSize: 12,
        color: textMuted,
        fontStyle: "italic",
        marginTop: 32,
        padding: "12px 16px",
        border: "1px solid rgba(255,255,255,0.04)",
        lineHeight: 1.7,
      }}
    >
      {text}
    </p>
  );
}

/* ─── main component ─────────────────────────────── */
export default function NRIGuideContent() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400&display=swap');

        .nri-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.1);
          margin-bottom: 48px;
        }
        .nri-stat-cell {
          padding: 40px 32px;
          background: #0a0a0c;
          text-align: center;
        }
        .nri-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.04);
        }
        .nri-step-cell {
          padding: 32px 24px;
          background: #111114;
        }
        .nri-tax-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .nri-help-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .nri-steps-grid {
            grid-template-columns: 1fr;
          }
          .nri-tax-grid {
            grid-template-columns: 1fr;
          }
          .nri-help-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .nri-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          background: "#0a0a0c",
          paddingTop: 140,
          paddingBottom: "clamp(60px,8vh,100px)",
        }}
      >
        <div style={container}>
          <FadeUp>
            <p style={eyebrow}>For Non-Resident Indians</p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
                lineHeight: 1.2,
                color: textPrimary,
                margin: "0 0 24px",
              }}
            >
              Invest in Mumbai{" "}
              <em style={{ fontStyle: "italic", color: gold }}>From Anywhere</em>
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 16,
                color: textSecondary,
                maxWidth: 600,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Navigating Indian real estate from abroad can feel complex. We
              simplify every step — from remote site visits to final handover,
              handled entirely by us.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 1 — WHY MUMBAI ── */}
      <section style={{ background: "#0a0a0c", padding: sectionPadding }}>
        <div style={container}>
          <FadeUp>
            <p style={eyebrow}>The Case for Mumbai</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.2,
                color: textPrimary,
                margin: "0 0 48px",
              }}
            >
              Why{" "}
              <em style={{ fontStyle: "italic", color: gold }}>Mumbai</em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="nri-stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="nri-stat-cell">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
                      color: gold,
                      margin: "0 0 8px",
                      lineHeight: 1,
                    }}
                  >
                    {s.number}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: 13,
                      color: textSecondary,
                      margin: "0 0 4px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {s.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: 11,
                      color: textMuted,
                      margin: 0,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 15,
                color: textSecondary,
                lineHeight: 1.85,
                maxWidth: 700,
              }}
            >
              Mumbai's luxury residential market has consistently delivered
              appreciation above inflation. For NRIs seeking diversification,
              tangible assets, and a connection to home, the case has never been
              stronger.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 2 — LEGAL FRAMEWORK ── */}
      <section style={{ background: "#111114", padding: sectionPadding }}>
        <div style={container}>
          <FadeUp>
            <p style={eyebrow}>Process Overview</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.2,
                color: textPrimary,
                margin: "0 0 48px",
              }}
            >
              Legal Process{" "}
              <em style={{ fontStyle: "italic", color: gold }}>Simplified</em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="nri-steps-grid">
              {legalSteps.map((step, i) => (
                <div key={i} className="nri-step-cell">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "2.2rem",
                      color: "rgba(212,175,55,0.2)",
                      margin: "0 0 16px",
                      lineHeight: 1,
                    }}
                  >
                    {step.num}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "1.25rem",
                      color: textPrimary,
                      margin: "0 0 14px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: 14,
                      color: textSecondary,
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
            <Disclaimer text="This is general guidance only. Please consult a qualified lawyer and Chartered Accountant for advice specific to your situation." />
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 3 — TAX IMPLICATIONS ── */}
      <section style={{ background: "#0a0a0c", padding: sectionPadding }}>
        <div style={container}>
          <FadeUp>
            <p style={eyebrow}>Financial Planning</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.2,
                color: textPrimary,
                margin: "0 0 48px",
              }}
            >
              Tax{" "}
              <em style={{ fontStyle: "italic", color: gold }}>
                Considerations
              </em>
            </h2>
          </FadeUp>

          <div className="nri-tax-grid">
            {taxPoints.map((point, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.1}>
                <div
                  style={{
                    padding: "28px 24px",
                    borderTop: `2px solid ${gold}`,
                    background:
                      "linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 100%)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "1.2rem",
                      color: textPrimary,
                      margin: "0 0 12px",
                    }}
                  >
                    {point.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: 14,
                      color: textSecondary,
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {point.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <Disclaimer text="Tax laws change frequently. Consult your CA before any transaction." />
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 4 — HOW AURELION HELPS ── */}
      <section style={{ background: "#111114", padding: sectionPadding }}>
        <div style={container}>
          <FadeUp>
            <p style={eyebrow}>Our NRI Service</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.2,
                color: textPrimary,
                margin: "0 0 48px",
              }}
            >
              How Aurelion{" "}
              <em style={{ fontStyle: "italic", color: gold }}>
                Helps NRIs
              </em>
            </h2>
          </FadeUp>

          <div className="nri-help-grid">
            {helpCards.map((card, i) => (
              <FadeUp key={i} delay={0.08 + i * 0.1}>
                <div style={glassCard}>
                  <div style={{ marginBottom: 18 }}>{card.icon}</div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "1.25rem",
                      color: textPrimary,
                      margin: "0 0 12px",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: 14,
                      color: textSecondary,
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — NRI FAQ ── */}
      <section style={{ background: "#0a0a0c", padding: sectionPadding }}>
        <div style={container}>
          <FadeUp>
            <p style={eyebrow}>Common Questions</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.2,
                color: textPrimary,
                margin: "0 0 48px",
              }}
            >
              NRI{" "}
              <em style={{ fontStyle: "italic", color: gold }}>
                Frequently Asked Questions
              </em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ maxWidth: 760 }}>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div style={{ ...goldDivider, marginTop: 60 }} />
            <div style={{ textAlign: "center", paddingTop: 16 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: 15,
                  color: textSecondary,
                  marginBottom: 28,
                  maxWidth: 480,
                  margin: "0 auto 28px",
                  lineHeight: 1.75,
                }}
              >
                Book a consultation to discuss your NRI investment strategy
              </p>
              <Link
                href="/contact"
                style={{
                  background: gold,
                  color: "#0a0a0c",
                  padding: "12px 28px",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                }}
              >
                Schedule a Consultation
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
