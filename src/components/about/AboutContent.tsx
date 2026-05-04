"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ─── shared tokens ─────────────────────────────── */
const gold = "#D4AF37";
const champagne = "#E8D5A3";
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

/* ─── fade-up animation helper ──────────────────── */
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
function ScaleIcon() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={gold}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v18M3 9l9-6 9 6" />
      <path d="M6 9l-3 6h6L6 9zM18 9l-3 6h6l-3-6z" />
      <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={gold}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={gold}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

/* ─── philosophy cards data ──────────────────────── */
const philosophy = [
  {
    icon: <ScaleIcon />,
    title: "Ethics",
    body: "We never recommend what we would not buy ourselves. Every suggestion is tested against the same standard: would this serve our own family? If not, it does not serve you.",
  },
  {
    icon: <HeartIcon />,
    title: "Loyalty",
    body: "Relationships outlast transactions. We measure success in decade-long client partnerships, not quick closures. Your long-term financial health is our metric.",
  },
  {
    icon: <ShieldIcon />,
    title: "Trust",
    body: "Total transparency, always. We disclose our compensation structure upfront, in writing, before any engagement begins. No surprises. No hidden incentives.",
  },
];

const credentials = [
  "Engineering Graduate",
  "Master of Business Administration (MBA)",
  "IRDAI Certified Insurance Advisor",
  "15+ Years Luxury Markets",
];

/* ─── team member type ───────────────────────────── */
interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  image: string | null;
  order: number;
}

/* ─── main component ─────────────────────────────── */
export default function AboutContent({
  pageContent,
  teamMembers = [],
  founderImage,
}: {
  pageContent?: string | null;
  teamMembers?: TeamMember[];
  founderImage?: string | null;
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400&display=swap');

        .about-founder-grid {
          display: grid;
          grid-template-columns: 55fr 45fr;
          gap: 80px;
          align-items: center;
        }
        .about-philosophy-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .about-credentials-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }
        @media (max-width: 900px) {
          .about-founder-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .about-philosophy-grid {
            grid-template-columns: 1fr;
          }
          .about-monogram-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
        @media (max-width: 600px) {
          .about-credentials-wrap {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          background: "#0a0a0c",
          paddingTop: 140,
          paddingBottom: "clamp(60px,8vh,100px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Luxury building architecture"
            fill
            style={{ objectFit: "cover", opacity: 0.08 }}
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
          <FadeUp>
            <p style={eyebrow}>Our Story</p>
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
              About{" "}
              <em style={{ fontStyle: "italic", color: gold }}>
                Aurelion Luxury
              </em>
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
              A client-first advisory built on fifteen years of precision,
              principle, and a refusal to compromise on what truly matters.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 1 — FOUNDER'S STORY ── */}
      <section style={{ background: "#0a0a0c", padding: sectionPadding }}>
        <div style={container}>
          <div className="about-founder-grid">
            {/* LEFT — story text */}
            <FadeUp delay={0.1}>
              <p style={eyebrow}>The Founder</p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  lineHeight: 1.2,
                  color: textPrimary,
                  margin: "0 0 28px",
                }}
              >
                A Decision Fifteen Years{" "}
                <em style={{ fontStyle: "italic", color: gold }}>
                  in the Making
                </em>
              </h2>

              {pageContent ? (
                <div
                  dangerouslySetInnerHTML={{ __html: pageContent }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: 15,
                    color: textSecondary,
                    lineHeight: 1.85,
                  }}
                />
              ) : (
                [
                  "Some decisions take years to crystallise. After fifteen years in the luxury automobile industry — evaluating hundreds of high-performance machines, building relationships with India's most discerning collectors, and navigating the intricate dance between aspiration and value — the idea for Aurelion Luxury became inevitable.",
                  "My engineering background taught me to look beyond surface appeal: what lies beneath the bodywork, how systems interact under stress, where corners are cut. When I applied this same precision to real estate and financial products, I found the same truth: most buyers receive recommendations shaped by commission structures rather than genuine fit.",
                  "Aurelion was built to change that. Funded entirely by developer and dealer partnerships, our advisory costs you nothing. Our IRDAI certification means insurance guidance meets the highest regulatory standard. Our MBA training means every recommendation is backed by strategic thinking, not gut instinct.",
                  "You deserve an advisor whose financial interests align perfectly with yours. That is the only version of this business we were willing to build.",
                ].map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: 15,
                      color: textSecondary,
                      lineHeight: 1.85,
                      margin: "0 0 18px",
                    }}
                  >
                    {para}
                  </p>
                ))
              )}

              <div
                style={{
                  marginTop: 32,
                  paddingTop: 24,
                  borderTop: "1px solid rgba(212,175,55,0.15)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "1.25rem",
                    color: textPrimary,
                    margin: "0 0 6px",
                  }}
                >
                  Swapnil
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: 13,
                    color: textMuted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  Founder &amp; Principal Advisor
                </p>
              </div>
            </FadeUp>

            {/* RIGHT — founder photo or monogram */}
            <FadeUp delay={0.25}>
              <div
                className="about-monogram-wrap"
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                {founderImage ? (
                  <img
                    src={founderImage}
                    alt="Swapnil — Founder"
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1px solid rgba(212,175,55,0.25)",
                      marginBottom: 28,
                      display: "block",
                    }}
                  />
                ) : (
                <div
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    border: "1px solid rgba(212,175,55,0.25)",
                    background:
                      "radial-gradient(circle at 40% 40%, rgba(212,175,55,0.08) 0%, rgba(10,10,12,0.9) 70%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 28,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "4.5rem",
                      color: gold,
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    S
                  </span>
                </div>
                )}
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "1.5rem",
                    color: textPrimary,
                    margin: "0 0 8px",
                    textAlign: "center",
                  }}
                >
                  Swapnil
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: 12,
                    color: textMuted,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    margin: "0 0 6px",
                    textAlign: "center",
                  }}
                >
                  Founder &amp; Principal Advisor
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: 12,
                    color: gold,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  15+ Years in Luxury Markets
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — OUR PHILOSOPHY ── */}
      <section style={{ background: "#111114", padding: sectionPadding }}>
        <div style={container}>
          <FadeUp>
            <p style={eyebrow}>What We Believe</p>
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
              <em style={{ fontStyle: "italic", color: gold }}>Philosophy</em>
            </h2>
          </FadeUp>

          <div className="about-philosophy-grid">
            {philosophy.map((item, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.12}>
                <div style={glassCard}>
                  <div style={{ marginBottom: 20 }}>{item.icon}</div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "1.3rem",
                      color: textPrimary,
                      margin: "0 0 14px",
                    }}
                  >
                    {item.title}
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
                    {item.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — CREDENTIALS ── */}
      <section style={{ background: "#0a0a0c", padding: sectionPadding }}>
        <div style={container}>
          <FadeUp>
            <p style={{ ...eyebrow, textAlign: "center" }}>Qualifications</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.2,
                color: textPrimary,
                textAlign: "center",
                margin: "0 0 16px",
              }}
            >
              Our{" "}
              <em style={{ fontStyle: "italic", color: gold }}>Credentials</em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 15,
                color: textSecondary,
                textAlign: "center",
                maxWidth: 520,
                margin: "0 auto 52px",
                lineHeight: 1.75,
              }}
            >
              Every recommendation we make is backed by formal training, industry
              certification, and over a decade of lived experience.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="about-credentials-wrap">
              {credentials.map((cred, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid rgba(212,175,55,0.3)",
                    padding: "16px 28px",
                    color: gold,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontSize: 11,
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {cred}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SECTION 3B — OUR TEAM ── */}
      {teamMembers.length > 0 && (
        <section style={{ background: "#111114", padding: sectionPadding }}>
          <style>{`
            .about-team-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
              gap: 24px;
              margin-top: 48px;
            }
          `}</style>
          <div style={container}>
            <FadeUp>
              <p style={{ ...eyebrow, textAlign: "center" }}>The People</p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  lineHeight: 1.2,
                  color: textPrimary,
                  textAlign: "center",
                  margin: "0 0 0",
                }}
              >
                Our{" "}
                <em style={{ fontStyle: "italic", color: gold }}>Team</em>
              </h2>
            </FadeUp>

            <div className="about-team-grid">
              {teamMembers.map((member, i) => (
                <FadeUp key={member.id} delay={0.1 + i * 0.1}>
                  <div style={glassCard}>
                    {/* Photo or monogram */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={96}
                          height={96}
                          style={{
                            width: 96,
                            height: 96,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "1px solid rgba(212,175,55,0.25)",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 96,
                            height: 96,
                            borderRadius: "50%",
                            border: "1px solid rgba(212,175,55,0.25)",
                            background: "radial-gradient(circle at 40% 40%, rgba(212,175,55,0.08) 0%, rgba(10,10,12,0.9) 70%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontWeight: 300,
                              fontSize: "2.5rem",
                              color: gold,
                              lineHeight: 1,
                              userSelect: "none",
                            }}
                          >
                            {member.name[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 300,
                        fontSize: "1.2rem",
                        color: textPrimary,
                        textAlign: "center",
                        margin: "0 0 6px",
                      }}
                    >
                      {member.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: 11,
                        color: gold,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        textAlign: "center",
                        margin: "0 0 16px",
                      }}
                    >
                      {member.title}
                    </p>
                    {member.bio && (
                      <>
                        <div style={goldDivider} />
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 300,
                            fontSize: 13,
                            color: textSecondary,
                            lineHeight: 1.8,
                            margin: 0,
                            textAlign: "center",
                          }}
                        >
                          {member.bio}
                        </p>
                      </>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 4 — OUR PROMISE ── */}
      <section style={{ background: "#111114", padding: sectionPadding }}>
        <div style={container}>
          <FadeUp>
            <div
              style={{
                maxWidth: 680,
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <p style={{ ...eyebrow, textAlign: "center" }}>
                Our Commitment
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                  lineHeight: 1.25,
                  color: textPrimary,
                  margin: "0 0 32px",
                }}
              >
                Your interests come first.{" "}
                <em style={{ fontStyle: "italic", color: gold }}>Always.</em>
              </h2>

              <div style={goldDivider} />

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: 15,
                  color: textSecondary,
                  lineHeight: 1.85,
                  margin: "0 0 40px",
                }}
              >
                We operate as fiduciaries — advisors whose legal and ethical
                obligation is to put your interest above our own. This is not a
                marketing promise. It is the architecture of how we earn our
                income, structured deliberately so that what is good for you is
                exactly what is good for us.
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
                Schedule a Private Consultation
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
