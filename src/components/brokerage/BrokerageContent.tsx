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
function BuildingIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="18" />
      <rect x="14" y="9" width="7" height="12" />
      <path d="M6 6h1M6 9h1M6 12h1M6 15h1M17 12h1M17 15h1" />
      <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l3-4h8l3 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
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

/* ─── fee cards data ─────────────────────────────── */
const feeCards = [
  {
    icon: <BuildingIcon />,
    title: "Real Estate Advisory",
    points: [
      "New construction: Zero brokerage to buyer. Developer pays our referral commission directly.",
      "Rentals: One month's rent for leases up to 12 months. Two months for longer terms.",
      "Resale properties: Negotiated case by case. Disclosed before engagement.",
    ],
  },
  {
    icon: <CarIcon />,
    title: "Automobile Advisory",
    points: [
      "Buying new through our dealer network: Zero cost to buyer.",
      "Selling your vehicle: 2–3% facilitation fee on successful transaction only. Zero if we don't sell.",
      "Technical inspections and documentation: Included at no additional charge.",
    ],
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Financial Services",
    points: [
      "Home loans and car loans: Zero cost to you. Lender pays standard referral.",
      "Insurance advisory: IRDAI-regulated commission from insurer, disclosed on first conversation.",
      "Renewal reminders and portfolio reviews: Complimentary for existing clients.",
    ],
  },
];

const commitments = [
  "All fees discussed and confirmed in writing before any engagement begins.",
  "No hidden charges. No add-ons. GST at 18% applies where applicable.",
  "All fees once paid are non-refundable, in line with standard advisory practice.",
  "Fully certified under IRDAI regulations for all insurance advisory services.",
];

const faqs = [
  {
    q: "Is your real estate advisory truly free?",
    a: "For buyers of new construction properties — yes, completely. The developer pays our referral commission as part of their standard sales cost. This does not inflate your property price; developers maintain a marketing budget for this purpose. For rentals and resale, our fee structure is disclosed before any engagement.",
  },
  {
    q: "Do you receive commissions from banks for loan referrals?",
    a: "Yes, and we believe in full disclosure: banks pay us a standard referral fee when we introduce a client who takes a loan. This fee is paid by the bank, not you, and does not affect your loan rate. We negotiate your rate independently, typically achieving 0.25–0.5% below standard quoted rates.",
  },
  {
    q: "How do you handle conflicts of interest?",
    a: "Our model is structured to minimise conflicts architecturally — we earn the same referral regardless of which developer or product you choose, so we have no financial incentive to push you toward any particular option. Our incentive is your satisfaction and your referral.",
  },
  {
    q: "What if I am unhappy with the advice I received?",
    a: "We welcome direct feedback and will work to make it right. Our reputation is entirely dependent on satisfied clients; we have no interest in protecting a fee at the cost of a relationship.",
  },
];

/* ─── accordion item ─────────────────────────────── */
function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
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
          maxHeight: open ? 300 : 0,
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

/* ─── main component ─────────────────────────────── */
export default function BrokerageContent() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400&display=swap');

        .brokerage-fee-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .brokerage-diagram {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .brokerage-fee-grid {
            grid-template-columns: 1fr;
          }
          .brokerage-diagram {
            flex-direction: column;
            gap: 0;
          }
          .brokerage-arrow {
            transform: rotate(90deg);
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
            <p style={eyebrow}>Transparency First</p>
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
              Our{" "}
              <em style={{ fontStyle: "italic", color: gold }}>Zero-Fee</em>{" "}
              Advisory Model
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 16,
                color: textSecondary,
                maxWidth: 560,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Complete clarity on how we earn our income — so you know our
              advice is always in your corner.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 1 — HOW IT WORKS ── */}
      <section style={{ background: "#0a0a0c", padding: sectionPadding }}>
        <div style={container}>
          <FadeUp>
            <p style={eyebrow}>The Model</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.2,
                color: textPrimary,
                margin: "0 0 60px",
              }}
            >
              How the Model{" "}
              <em style={{ fontStyle: "italic", color: gold }}>Works</em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            {/* diagram */}
            <div className="brokerage-diagram" style={{ marginBottom: 52 }}>
              {/* Circle 1 */}
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  border: "1px solid rgba(212,175,55,0.3)",
                  background:
                    "radial-gradient(circle, rgba(212,175,55,0.04) 0%, rgba(10,10,12,0.95) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 16,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "1rem",
                    color: textSecondary,
                    lineHeight: 1.3,
                  }}
                >
                  Developer
                  <br />/ Dealer
                </span>
              </div>

              {/* Arrow 1 */}
              <div
                className="brokerage-arrow"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "0 20px",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: 11,
                    color: gold,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Commission
                </span>
                <div
                  style={{
                    width: 80,
                    height: 1,
                    background:
                      "linear-gradient(to right, rgba(212,175,55,0.3), rgba(212,175,55,0.7))",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      right: -4,
                      top: -4,
                      color: gold,
                      fontSize: 10,
                    }}
                  >
                    ▶
                  </span>
                </div>
              </div>

              {/* Circle 2 — Aurelion (larger) */}
              <div
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  border: "1px solid rgba(212,175,55,0.4)",
                  background:
                    "radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(10,10,12,0.95) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 16,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "1rem",
                    color: gold,
                    lineHeight: 1.3,
                  }}
                >
                  Aurelion
                  <br />Luxury
                </span>
              </div>

              {/* Arrow 2 */}
              <div
                className="brokerage-arrow"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "0 20px",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: 11,
                    color: gold,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Free Advisory
                </span>
                <div
                  style={{
                    width: 80,
                    height: 1,
                    background:
                      "linear-gradient(to right, rgba(212,175,55,0.3), rgba(212,175,55,0.7))",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      right: -4,
                      top: -4,
                      color: gold,
                      fontSize: 10,
                    }}
                  >
                    ▶
                  </span>
                </div>
              </div>

              {/* Circle 3 — You */}
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  border: "1px solid rgba(212,175,55,0.3)",
                  background:
                    "radial-gradient(circle, rgba(212,175,55,0.04) 0%, rgba(10,10,12,0.95) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 16,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "1.1rem",
                    color: textPrimary,
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  You
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: 11,
                    color: gold,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Zero Cost
                </span>
              </div>
            </div>

            {/* quote below diagram */}
            <div
              style={{
                maxWidth: 680,
                margin: "0 auto",
                textAlign: "center",
                padding: "32px 0",
                borderTop: "1px solid rgba(212,175,55,0.1)",
                borderBottom: "1px solid rgba(212,175,55,0.1)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "1.25rem",
                  color: textSecondary,
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                &ldquo;Our revenue comes entirely from developer and dealer
                partnerships. Your advisory is always free, unbiased, and
                structured to serve only your interest.&rdquo;
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 2 — FEE BREAKDOWN ── */}
      <section style={{ background: "#111114", padding: sectionPadding }}>
        <div style={container}>
          <FadeUp>
            <p style={eyebrow}>Full Disclosure</p>
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
              Fee Structure by{" "}
              <em style={{ fontStyle: "italic", color: gold }}>Service</em>
            </h2>
          </FadeUp>

          <div className="brokerage-fee-grid">
            {feeCards.map((card, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.12}>
                <div style={{ ...glassCard, height: "100%" }}>
                  <div style={{ marginBottom: 20 }}>{card.icon}</div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "1.3rem",
                      color: textPrimary,
                      margin: "0 0 20px",
                    }}
                  >
                    {card.title}
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {card.points.map((pt, j) => (
                      <li
                        key={j}
                        style={{
                          display: "flex",
                          gap: 10,
                          marginBottom: 16,
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            color: gold,
                            fontSize: 12,
                            marginTop: 3,
                            flexShrink: 0,
                          }}
                        >
                          —
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 300,
                            fontSize: 14,
                            color: textSecondary,
                            lineHeight: 1.75,
                          }}
                        >
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — COMMITMENTS ── */}
      <section style={{ background: "#0a0a0c", padding: sectionPadding }}>
        <div style={container}>
          <FadeUp>
            <p style={eyebrow}>What We Guarantee</p>
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
              Our{" "}
              <em style={{ fontStyle: "italic", color: gold }}>Commitments</em>
            </h2>
          </FadeUp>

          <div
            style={{
              maxWidth: 720,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {commitments.map((item, i) => (
              <FadeUp key={i} delay={0.08 * i}>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    padding: "20px 24px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderLeft: `2px solid ${gold}`,
                  }}
                >
                  <div style={{ flexShrink: 0, marginTop: 1 }}>
                    <CheckIcon />
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: 15,
                      color: textSecondary,
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {item}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — FAQ ── */}
      <section style={{ background: "#111114", padding: sectionPadding }}>
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
              Frequently Asked{" "}
              <em style={{ fontStyle: "italic", color: gold }}>Questions</em>
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
            <div style={{ marginTop: 60, ...goldDivider }} />
            <div style={{ textAlign: "center", paddingTop: 16 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: 15,
                  color: textSecondary,
                  marginBottom: 28,
                }}
              >
                Speak with us about your requirements
              </p>
              <Link
                href="/contact"
                style={{
                  border: "1px solid rgba(212,175,55,0.4)",
                  color: gold,
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
                Get in Touch
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
