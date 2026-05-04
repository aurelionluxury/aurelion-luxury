"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Market = {
  id: number;
  name: string;
  slug: string;
  zone: string;
  description: string | null;
  content: string | null;
  avgPrice: number | null;
  priceRange: string | null;
  connectivity: string | null;
  landmarks: string | null;
  images: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// 3 hardcoded nearby markets shown on every detail page
const relatedMarkets = [
  { slug: "worli", name: "Worli", zone: "South Mumbai" },
  { slug: "bandra-west", name: "Bandra West", zone: "Bandra-Khar Belt" },
  { slug: "andheri-west", name: "Andheri West", zone: "Andheri-Goregaon" },
];

function formatPrice(avgPrice: number | null): string {
  if (!avgPrice) return "";
  return `₹${avgPrice.toLocaleString("en-IN")} psf`;
}

function HeroSection({ market }: { market: Market }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const priceDisplay =
    market.priceRange ?? (market.avgPrice ? formatPrice(market.avgPrice) : null);

  return (
    <section
      ref={ref}
      style={{
        background: "#0a0a0c",
        paddingTop: 140,
        paddingBottom: "clamp(70px,10vh,120px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 65%)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)",
      }} />

      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "0 clamp(24px,5vw,80px)",
        position: "relative", zIndex: 1,
      }}>
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 32 }}
        >
          <Link
            href="/mumbai-guide"
            style={{
              fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", fontWeight: 300,
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#D4AF37"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
          >
            ← Mumbai Guide
          </Link>
        </motion.div>

        {/* Zone badge */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            display: "inline-block",
            border: "1px solid rgba(212,175,55,0.4)",
            color: "#D4AF37",
            fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
            padding: "5px 14px", borderRadius: 20, fontWeight: 400,
            marginBottom: 24,
          }}
        >
          {market.zone}
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2.5rem,5vw,4rem)",
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          {market.name}
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            width: 48, height: 1,
            background: "linear-gradient(to right, #D4AF37, transparent)",
            marginBottom: 32, transformOrigin: "left",
          }}
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          style={{ display: "flex", gap: "clamp(24px,4vw,56px)", flexWrap: "wrap" }}
        >
          {priceDisplay && (
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.3rem,2.5vw,1.8rem)",
                fontWeight: 300, color: "#D4AF37", lineHeight: 1,
                marginBottom: 6,
              }}>
                {priceDisplay}
              </div>
              <div style={{
                fontSize: 10, letterSpacing: "0.13em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)", fontWeight: 300,
              }}>
                Price Range
              </div>
            </div>
          )}
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.3rem,2.5vw,1.8rem)",
              fontWeight: 300, color: "rgba(255,255,255,0.7)", lineHeight: 1,
              marginBottom: 6,
            }}>
              {market.zone}
            </div>
            <div style={{
              fontSize: 10, letterSpacing: "0.13em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", fontWeight: 300,
            }}>
              Zone
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MainContent({ market }: { market: Market }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const landmarkList = market.landmarks
    ? market.landmarks
        .split(/[\n,;]+/)
        .map((l) => l.trim())
        .filter(Boolean)
    : [];

  return (
    <section
      ref={ref}
      style={{
        background: "#111114",
        padding: "clamp(60px,9vh,110px) 0",
      }}
    >
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "0 clamp(24px,5vw,80px)",
      }}>
        <div className="detail-layout">
          {/* LEFT: main content */}
          <div className="detail-left">
            {/* Description */}
            {market.description && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                style={{ marginBottom: 40 }}
              >
                <p style={{
                  fontSize: "clamp(15px,1.6vw,17px)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 300,
                  borderLeft: "2px solid rgba(212,175,55,0.4)",
                  paddingLeft: 20,
                }}>
                  {market.description}
                </p>
              </motion.div>
            )}

            {/* Long-form content */}
            {market.content && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="market-article"
                dangerouslySetInnerHTML={{ __html: market.content }}
              />
            )}

            {/* Connectivity */}
            {market.connectivity && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 }}
                style={{
                  marginTop: 36,
                  background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 10,
                  padding: "24px 28px",
                }}
              >
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "1.25rem",
                  color: "#D4AF37",
                  marginBottom: 14,
                  letterSpacing: "0.03em",
                }}>
                  Getting Around
                </h3>
                <p style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.55)",
                  fontWeight: 300,
                }}>
                  {market.connectivity}
                </p>
              </motion.div>
            )}

            {/* Landmarks */}
            {landmarkList.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{ marginTop: 32 }}
              >
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "1.25rem",
                  color: "rgba(255,255,255,0.75)",
                  marginBottom: 16,
                  letterSpacing: "0.03em",
                }}>
                  Landmarks &amp; Highlights
                </h3>
                <ul style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "10px 20px",
                }}>
                  {landmarkList.map((item, i) => (
                    <li key={i} style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.5)",
                      fontWeight: 300,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      lineHeight: 1.5,
                    }}>
                      <span style={{ color: "#D4AF37", fontSize: 10 }}>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* RIGHT: sticky enquiry card */}
          <div className="detail-right">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 }}
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                backdropFilter: "blur(20px)",
                padding: "32px 28px",
                position: "sticky",
                top: 100,
              }}
            >
              {/* Card heading */}
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "1.3rem",
                color: "rgba(255,255,255,0.88)",
                marginBottom: 12,
                lineHeight: 1.3,
              }}>
                Looking for property in {market.name}?
              </h3>
              <p style={{
                fontSize: 13,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.45)",
                fontWeight: 300,
                marginBottom: 28,
              }}>
                Share your requirements and we&apos;ll curate the right options
                from our portfolio.
              </p>

              {/* Primary CTA */}
              <Link
                href="/contact"
                style={{
                  display: "block",
                  background: "#D4AF37",
                  color: "#0a0a0c",
                  textAlign: "center",
                  fontSize: 11,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  padding: "14px 20px",
                  textDecoration: "none",
                  marginBottom: 12,
                  boxShadow: "0 6px 24px rgba(212,175,55,0.2)",
                  transition: "background 0.3s ease",
                  borderRadius: 2,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#E8D5A3"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#D4AF37"; }}
              >
                Speak With Us
              </Link>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  border: "1px solid rgba(212,175,55,0.3)",
                  color: "#D4AF37",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  padding: "13px 20px",
                  textDecoration: "none",
                  marginBottom: 28,
                  transition: "border-color 0.3s ease, background 0.3s ease",
                  borderRadius: 2,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(212,175,55,0.6)";
                  el.style.background = "rgba(212,175,55,0.05)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(212,175,55,0.3)";
                  el.style.background = "transparent";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>

              {/* Divider */}
              <div style={{
                height: 1,
                background: "linear-gradient(to right, rgba(212,175,55,0.2), transparent)",
                marginBottom: 24,
              }} />

              {/* Quick facts */}
              <p style={{
                fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)", fontWeight: 400, marginBottom: 16,
              }}>
                Quick Facts
              </p>
              <dl style={{ margin: 0, padding: 0 }}>
                {[
                  { label: "Zone", value: market.zone },
                  ...(market.priceRange ? [{ label: "Price Range", value: market.priceRange }] : []),
                  ...(market.avgPrice ? [{ label: "Avg. Per Sqft", value: formatPrice(market.avgPrice) }] : []),
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "baseline", marginBottom: 10,
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    paddingBottom: 10,
                  }}>
                    <dt style={{
                      fontSize: 11, letterSpacing: "0.08em",
                      color: "rgba(255,255,255,0.35)", fontWeight: 300,
                    }}>
                      {label}
                    </dt>
                    <dd style={{
                      fontSize: 12, color: "rgba(255,255,255,0.7)",
                      fontWeight: 300, margin: 0, textAlign: "right", maxWidth: "55%",
                    }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RelatedSection({ currentSlug }: { currentSlug: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const nearby = relatedMarkets.filter((m) => m.slug !== currentSlug).slice(0, 3);

  return (
    <section
      ref={ref}
      style={{
        background: "#0a0a0c",
        padding: "clamp(60px,9vh,110px) 0",
        position: "relative",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)",
      }} />

      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "0 clamp(24px,5vw,80px)",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 40 }}
        >
          <span style={{
            display: "block", fontSize: 12, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#D4AF37", fontWeight: 400,
            marginBottom: 16,
          }}>
            Continue Exploring
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
            color: "rgba(255,255,255,0.88)",
          }}>
            Also Explore
          </h2>
        </motion.div>

        <div className="related-grid">
          {nearby.map((m, i) => (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Link
                href={`/mumbai-guide/${m.slug}`}
                className="related-card"
                style={{
                  display: "block",
                  background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: "28px 24px",
                  textDecoration: "none",
                  transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.borderColor = "rgba(212,175,55,0.25)";
                  el.style.boxShadow = "0 12px 40px rgba(212,175,55,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.boxShadow = "none";
                }}
              >
                <span style={{
                  display: "block", fontSize: 9, letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "#D4AF37",
                  fontWeight: 400, marginBottom: 12,
                }}>
                  {m.zone}
                </span>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "1.3rem",
                  color: "rgba(255,255,255,0.88)",
                  marginBottom: 16,
                }}>
                  {m.name}
                </h3>
                <span style={{
                  fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#D4AF37", fontWeight: 400,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  View Guide <span style={{ fontSize: 13 }}>→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MicroMarketDetailClient({ market }: { market: Market }) {
  return (
    <>
      <HeroSection market={market} />
      <MainContent market={market} />
      <RelatedSection currentSlug={market.slug} />

      <style>{`
        .detail-layout {
          display: grid;
          grid-template-columns: 65fr 35fr;
          gap: clamp(32px, 5vw, 60px);
          align-items: start;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .market-article {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
          font-weight: 300;
        }
        .market-article h2, .market-article h3 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          color: rgba(255,255,255,0.85);
          margin-top: 28px;
          margin-bottom: 12px;
        }
        .market-article h2 { font-size: 1.5rem; }
        .market-article h3 { font-size: 1.25rem; }
        .market-article p { margin-bottom: 16px; }
        .market-article a { color: #D4AF37; }
        @media (max-width: 900px) {
          .detail-layout {
            grid-template-columns: 1fr;
          }
          .detail-right {
            order: -1;
          }
          .related-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}
