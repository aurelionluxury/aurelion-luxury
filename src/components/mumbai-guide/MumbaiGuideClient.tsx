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
  priceRange: string | null;
  avgPrice: number | null;
  connectivity: string | null;
  landmarks: string | null;
  images: string | null;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type FallbackMarket = {
  id: number;
  slug: string;
  name: string;
  zone: string;
  priceRange: string | null;
  appreciation?: string;
  description: string | null;
};

type DisplayMarket = Market | FallbackMarket;

const fallbackMarkets: FallbackMarket[] = [
  { id: 1, slug: "worli", name: "Worli", zone: "South Mumbai", priceRange: "₹40,000–95,000 psf", appreciation: "9.2% YoY", description: "Mumbai's skyline address. Sea-facing towers, corporate proximity, and connectivity via the Bandra-Worli Sea Link define Worli as the premium choice for business families." },
  { id: 2, slug: "malabar-hill", name: "Malabar Hill", zone: "South Mumbai", priceRange: "₹60,000–1,20,000 psf", appreciation: "6.8% YoY", description: "Old money, green lungs, and political gravitas. Malabar Hill is where Mumbai's most established families have lived for generations — and supply is permanently constrained." },
  { id: 3, slug: "lower-parel", name: "Lower Parel", zone: "South Mumbai", priceRange: "₹30,000–55,000 psf", appreciation: "11.3% YoY", description: "Mumbai's fastest-evolving luxury precinct. Former mill lands now host five-star hotels, glass towers, and the highest concentration of luxury retail in the city." },
  { id: 4, slug: "marine-drive", name: "Marine Drive", zone: "South Mumbai", priceRange: "₹55,000–1,00,000 psf", appreciation: "7.1% YoY", description: "The Queen's Necklace. Seafront living with historical prestige and irreplaceable views. Supply is extremely limited — less than a handful of new projects emerge each decade." },
  { id: 5, slug: "bandra-west", name: "Bandra West", zone: "Bandra-Khar Belt", priceRange: "₹35,000–80,000 psf", appreciation: "10.4% YoY", description: "Mumbai's most aspirational address for the creative and corporate elite. Hill Road, Carter Road, and the Bandstand promenade create an energy unmatched anywhere else in the city." },
  { id: 6, slug: "juhu", name: "Juhu", zone: "Bandra-Khar Belt", priceRange: "₹30,000–70,000 psf", appreciation: "8.9% YoY", description: "Beachfront bungalows and celebrity residences. Juhu offers horizontal living in a vertical city, with sea air, privacy, and proximity to the airport making it perennially desirable." },
  { id: 7, slug: "khar", name: "Khar", zone: "Bandra-Khar Belt", priceRange: "₹28,000–60,000 psf", appreciation: "9.7% YoY", description: "Bandra's quieter neighbour with strong fundamentals. Predominantly residential, with excellent schools and a settled family feel, Khar commands serious premiums over nearby areas." },
  { id: 8, slug: "santacruz", name: "Santacruz", zone: "Bandra-Khar Belt", priceRange: "₹22,000–45,000 psf", appreciation: "8.2% YoY", description: "Well-connected and underappreciated. Santacruz East's BKC proximity and Santacruz West's residential calm make it one of the better value propositions in the western suburbs." },
  { id: 9, slug: "andheri-west", name: "Andheri West", zone: "Andheri-Goregaon", priceRange: "₹18,000–38,000 psf", appreciation: "10.1% YoY", description: "The commercial and residential anchor of the mid-suburbs. With SEEPZ, the metro network, and excellent airport access, Andheri West's luxury segment is growing faster than the market average." },
  { id: 10, slug: "goregaon", name: "Goregaon", zone: "Andheri-Goregaon", priceRange: "₹14,000–28,000 psf", appreciation: "11.8% YoY", description: "The highest appreciation rate in Mumbai's luxury segment. Proximity to Film City, improving infrastructure, and relative affordability create strong momentum here." },
  { id: 11, slug: "lokhandwala", name: "Lokhandwala", zone: "Andheri-Goregaon", priceRange: "₹16,000–32,000 psf", appreciation: "9.3% YoY", description: "Entertainment industry heartland with a distinctive social energy. Lokhandwala Complex has evolved from a film industry colony to a proper luxury residential destination." },
  { id: 12, slug: "borivali", name: "Borivali", zone: "Borivali-Dahisar", priceRange: "₹12,000–22,000 psf", appreciation: "8.6% YoY", description: "National Park proximity and large apartment formats define Borivali's luxury appeal. Metro expansion and infrastructure investment have accelerated premium development significantly." },
  { id: 13, slug: "dahisar", name: "Dahisar", zone: "Borivali-Dahisar", priceRange: "₹9,000–16,000 psf", appreciation: "12.1% YoY", description: "Mumbai's fastest-appreciating suburb. Strategic infrastructure investment, the upcoming metro lines, and land availability make Dahisar the smart bet for long-horizon buyers." },
];

const ZONE_ORDER = ["South Mumbai", "Bandra-Khar Belt", "Andheri-Goregaon", "Borivali-Dahisar"];

function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    { value: "13", label: "Micro-Markets Covered" },
    { value: "Live", label: "Price Data" },
    { value: "Quarterly", label: "Updates" },
  ];

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
      {/* Background decoration */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)",
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", position: "relative", zIndex: 1 }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "block", fontSize: 12, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#D4AF37", fontWeight: 400,
            marginBottom: 28,
          }}
        >
          Market Intelligence
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2.8rem,6vw,5rem)",
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 720,
          }}
        >
          Mumbai{" "}
          <em style={{ fontStyle: "italic", color: "#D4AF37" }}>
            Micro-Market Guide
          </em>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            width: 48, height: 1,
            background: "linear-gradient(to right, #D4AF37, transparent)",
            marginBottom: 28, transformOrigin: "left",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontSize: "clamp(15px,1.8vw,17px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
            fontWeight: 300,
            maxWidth: 580,
            marginBottom: 56,
          }}
        >
          Neighbourhood-by-neighbourhood intelligence for the discerning buyer.
          From historic South Mumbai to the emerging northern corridors.
        </motion.p>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ display: "flex", gap: "clamp(24px,4vw,60px)", flexWrap: "wrap" }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.6rem,3vw,2.2rem)",
                fontWeight: 300,
                color: "#D4AF37",
                lineHeight: 1,
              }}>
                {stat.value}
              </span>
              <span style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 300,
              }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MarketCard({ market, index }: { market: DisplayMarket; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const priceRange = "priceRange" in market ? market.priceRange : null;
  const appreciation = "appreciation" in market ? market.appreciation : undefined;
  const avgPrice = "avgPrice" in market ? market.avgPrice : null;
  const appreciationLabel = appreciation ?? (avgPrice ? `+${avgPrice.toLocaleString("en-IN")} psf` : null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08 }}
      className="market-card"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        backdropFilter: "blur(20px)",
        padding: "28px 24px 24px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Zone badge */}
      <span style={{
        position: "absolute", top: 16, right: 16,
        fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
        color: "#D4AF37", fontWeight: 400,
      }}>
        {market.zone}
      </span>

      {/* Area name */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: "1.4rem",
        color: "rgba(255,255,255,0.88)",
        marginBottom: 10,
        lineHeight: 1.2,
        paddingRight: 40,
      }}>
        {market.name}
      </h3>

      {/* Price range */}
      {priceRange && (
        <span style={{
          fontSize: 12,
          color: "#D4AF37",
          fontWeight: 300,
          marginBottom: 10,
          display: "block",
          letterSpacing: "0.03em",
        }}>
          {priceRange}
        </span>
      )}

      {/* Appreciation badge */}
      {appreciationLabel && (
        <span style={{
          display: "inline-block",
          background: "rgba(212,175,55,0.1)",
          color: "#D4AF37",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "3px 10px",
          borderRadius: 20,
          marginBottom: 16,
          alignSelf: "flex-start",
          border: "1px solid rgba(212,175,55,0.2)",
          fontWeight: 400,
        }}>
          {appreciationLabel}
        </span>
      )}

      {/* Description */}
      <p style={{
        fontSize: 13,
        fontWeight: 300,
        color: "rgba(255,255,255,0.5)",
        lineHeight: 1.6,
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        marginBottom: 20,
        flex: 1,
      }}>
        {market.description}
      </p>

      {/* Divider */}
      <div style={{
        height: 1,
        background: "linear-gradient(to right, rgba(212,175,55,0.2), transparent)",
        marginBottom: 18,
      }} />

      {/* Explore link */}
      <Link
        href={`/mumbai-guide/${market.slug}`}
        style={{
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#D4AF37",
          fontWeight: 400,
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "gap 0.2s ease",
          textDecoration: "none",
        }}
        className="explore-link"
      >
        Explore This Market
        <span style={{ fontSize: 13 }}>→</span>
      </Link>
    </motion.div>
  );
}

function MarketsSection({ markets }: { markets: Market[] }) {
  const displayMarkets: DisplayMarket[] = markets.length > 0 ? markets : fallbackMarkets;

  const grouped: Record<string, DisplayMarket[]> = {};
  for (const zone of ZONE_ORDER) {
    grouped[zone] = displayMarkets.filter((m) => m.zone === zone);
  }
  // Catch any zones not in the ZONE_ORDER
  for (const m of displayMarkets) {
    if (!grouped[m.zone]) {
      grouped[m.zone] = displayMarkets.filter((mk) => mk.zone === m.zone);
    }
  }

  return (
    <section style={{
      background: "#111114",
      padding: "clamp(60px,8vh,100px) 0",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        {Object.entries(grouped).map(([zone, zoneMarkets]) => {
          if (!zoneMarkets || zoneMarkets.length === 0) return null;
          return (
            <ZoneGroup key={zone} zone={zone} markets={zoneMarkets} />
          );
        })}
      </div>
    </section>
  );
}

function ZoneGroup({ zone, markets }: { zone: string; markets: (Market | FallbackMarket)[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} style={{ marginBottom: "clamp(48px,7vh,80px)" }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 32 }}
      >
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "1.8rem",
          color: "#D4AF37",
          letterSpacing: "0.05em",
          marginBottom: 12,
        }}>
          {zone}
        </h2>
        <div style={{
          width: 40,
          height: 1,
          background: "#D4AF37",
        }} />
      </motion.div>

      <div className="markets-grid">
        {markets.map((market, i) => (
          <MarketCard key={market.id} market={market as DisplayMarket} index={i} />
        ))}
      </div>
    </div>
  );
}

function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      style={{
        background: "#0a0a0c",
        padding: "clamp(80px,12vh,140px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)",
      }} />

      <div style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "0 clamp(24px,5vw,80px)",
        textAlign: "center",
        position: "relative", zIndex: 1,
      }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "block", fontSize: 12, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#D4AF37", fontWeight: 400,
            marginBottom: 24,
          }}
        >
          Personalised Guidance
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2rem,4vw,3rem)",
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          Not sure which micro-market suits you?
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0.2, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            width: 40, height: 1,
            background: "linear-gradient(to right, transparent, #D4AF37, transparent)",
            margin: "0 auto 24px",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
            fontWeight: 300,
            marginBottom: 40,
          }}
        >
          Share your priorities — schools, commute, lifestyle, budget — and we
          will identify the best fit from our ground-level knowledge.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.36 }}
        >
          <Link
            href="/contact"
            className="cta-btn"
            style={{
              background: "#D4AF37",
              color: "#0a0a0c",
              fontWeight: 400,
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "16px 40px",
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(212,175,55,0.2)",
              transition: "background 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#E8D5A3";
              el.style.boxShadow = "0 12px 40px rgba(212,175,55,0.3)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#D4AF37";
              el.style.boxShadow = "0 8px 32px rgba(212,175,55,0.2)";
            }}
          >
            Speak With Our Team
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function MumbaiGuideClient({ markets }: { markets: Market[] }) {
  return (
    <>
      <HeroSection />
      <MarketsSection markets={markets} />
      <CTABanner />

      <style>{`
        .markets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .market-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(212,175,55,0.1);
          border-color: rgba(212,175,55,0.25) !important;
        }
        .explore-link:hover {
          gap: 10px !important;
        }
        @media (max-width: 600px) {
          .markets-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 601px) and (max-width: 900px) {
          .markets-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}
