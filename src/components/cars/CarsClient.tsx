"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

type Vehicle = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  make: string;
  model: string;
  year: number;
  variant: string | null;
  type: string;
  condition: string;
  status: string;
  price: number;
  priceLabel: string | null;
  mileage: number | null;
  fuel: string | null;
  transmission: string | null;
  color: string | null;
  features: string | null;
  images: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type CurrentParams = {
  make?: string;
  bodyType?: string;
  condition?: string;
  budget?: string;
};

type Props = {
  vehicles: Vehicle[];
  total: number;
  currentParams: CurrentParams;
};

// Inline car SVG icon
function CarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 100 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 32 L18 18 Q22 12 30 12 L70 12 Q78 12 82 18 L90 32 L94 32 Q96 32 96 34 L96 38 Q96 40 94 40 L88 40 Q86 46 80 46 Q74 46 72 40 L28 40 Q26 46 20 46 Q14 46 12 40 L6 40 Q4 40 4 38 L4 34 Q4 32 6 32 Z"
        fill="rgba(212,175,55,0.4)"
      />
      <circle cx="20" cy="42" r="4" fill="rgba(212,175,55,0.3)" />
      <circle cx="80" cy="42" r="4" fill="rgba(212,175,55,0.3)" />
      <path
        d="M28 18 L35 12 L65 12 L72 18 Z"
        fill="rgba(212,175,55,0.2)"
      />
    </svg>
  );
}

function getFirstImage(raw: string | null): string | null {
  if (!raw) return null;
  const s = raw.trim();
  if (!s) return null;
  try {
    const arr = JSON.parse(s);
    if (Array.isArray(arr) && arr.length > 0) return String(arr[0]).trim() || null;
    if (typeof arr === "string" && arr.trim()) return arr.trim();
  } catch { /* not JSON */ }
  const first = s.split(",")[0]?.trim();
  return first || null;
}

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
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80"
          alt="Luxury automobiles"
          fill
          style={{ objectFit: "cover", opacity: 0.15 }}
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
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
          zIndex: 2,
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
          zIndex: 3,
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "block",
            fontSize: 12,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#D4AF37",
            fontWeight: 400,
            marginBottom: 28,
          }}
        >
          Curated Collection
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
          Luxury{" "}
          <em style={{ color: "#D4AF37", fontStyle: "italic" }}>
            Automobiles
          </em>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
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
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontSize: "clamp(15px,1.8vw,17px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
            fontWeight: 300,
            maxWidth: 580,
          }}
        >
          Every vehicle personally evaluated by our expert evaluator — 15+ years of
          engineering-grade assessment across Mumbai&apos;s finest pre-owned
          and new luxury market.
        </motion.p>
      </div>
    </section>
  );
}

const selectStyle: React.CSSProperties = {
  background: "#1a1a1f",
  border: "1px solid rgba(212,175,55,0.15)",
  color: "rgba(255,255,255,0.7)",
  padding: "8px 12px",
  fontSize: 13,
  fontWeight: 300,
  fontFamily: "inherit",
  cursor: "pointer",
  outline: "none",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(212,175,55,0.5)'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  paddingRight: 28,
  minWidth: 160,
  borderRadius: 4,
};

function FilterBar({
  currentParams,
  onFilter,
}: {
  currentParams: CurrentParams;
  onFilter: (key: string, value: string) => void;
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: 80,
        zIndex: 40,
        background: "rgba(10,10,12,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(212,175,55,0.1)",
        padding: "14px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px,5vw,80px)",
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            fontWeight: 300,
            marginRight: 4,
          }}
        >
          Filter
        </span>

        <select
          style={selectStyle}
          value={currentParams.make ?? ""}
          onChange={(e) => onFilter("make", e.target.value)}
        >
          <option value="">All Makes</option>
          <option value="Mercedes-Benz">Mercedes-Benz</option>
          <option value="BMW">BMW</option>
          <option value="Audi">Audi</option>
          <option value="Porsche">Porsche</option>
          <option value="Range Rover">Range Rover</option>
          <option value="Lamborghini">Lamborghini</option>
          <option value="Ferrari">Ferrari</option>
        </select>

        <select
          style={selectStyle}
          value={currentParams.bodyType ?? ""}
          onChange={(e) => onFilter("bodyType", e.target.value)}
        >
          <option value="">All Body Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Sports">Sports</option>
          <option value="Coupe">Coupe</option>
          <option value="Convertible">Convertible</option>
        </select>

        <select
          style={selectStyle}
          value={currentParams.condition ?? ""}
          onChange={(e) => onFilter("condition", e.target.value)}
        >
          <option value="">All Conditions</option>
          <option value="New">New</option>
          <option value="Pre-Owned">Pre-Owned</option>
        </select>

        <select
          style={selectStyle}
          value={currentParams.budget ?? ""}
          onChange={(e) => onFilter("budget", e.target.value)}
        >
          <option value="">All Budgets</option>
          <option value="below-50">Below ₹50L</option>
          <option value="50-100">₹50–100L</option>
          <option value="1-3cr">₹1–3 Cr</option>
          <option value="3cr-plus">₹3 Cr+</option>
        </select>
      </div>
    </div>
  );
}

function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const priceDisplay =
    vehicle.priceLabel ||
    `₹${(vehicle.price / 100000).toFixed(0)} Lakhs`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 12,
        backdropFilter: "blur(20px)",
        overflow: "hidden",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 48px rgba(212,175,55,0.12)"
          : "0 2px 12px rgba(0,0,0,0.3)",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Image area */}
      {(() => {
        const imgSrc = getFirstImage(vehicle.images);
        return (
        <div
          style={{
            height: 260,
            background: "linear-gradient(145deg, #0d1f3c 0%, #0a0a0c 80%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            gap: 12,
            overflow: "hidden",
          }}
        >
          {imgSrc ? (
            <img src={imgSrc} alt={vehicle.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }} />
          ) : (
            <>
              <CarIcon size={64} />
              <span style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,175,55,0.6)", fontWeight: 400 }}>
                Photo Coming Soon
              </span>
            </>
          )}

        {/* Condition badge top-right */}
        <span
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: 20,
            fontWeight: 400,
            ...(vehicle.condition === "New"
              ? {
                  border: "1px solid rgba(212,175,55,0.6)",
                  color: "#D4AF37",
                  background: "rgba(212,175,55,0.08)",
                }
              : {
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.5)",
                  background: "rgba(255,255,255,0.04)",
                }),
          }}
        >
          {vehicle.condition}
        </span>

        {/* Featured badge top-left */}
        {vehicle.featured && (
          <span
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: 20,
              fontWeight: 400,
              background: "rgba(212,175,55,0.15)",
              color: "#D4AF37",
              border: "1px solid rgba(212,175,55,0.4)",
            }}
          >
            Featured
          </span>
        )}
      </div>
        );
      })()}

      {/* Content */}
      <div style={{ padding: "20px 24px" }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#D4AF37",
            fontWeight: 400,
            marginBottom: 8,
          }}
        >
          {vehicle.year} · {vehicle.make}
        </div>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "1.2rem",
            color: hovered ? "#D4AF37" : "rgba(255,255,255,0.88)",
            marginBottom: 6,
            lineHeight: 1.25,
            transition: "color 0.3s ease",
          }}
        >
          {vehicle.title}
        </h3>

        {vehicle.variant && (
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              fontWeight: 300,
              marginBottom: 16,
            }}
          >
            {vehicle.variant}
          </p>
        )}

        <div
          style={{
            height: 1,
            background: "linear-gradient(to right, rgba(212,175,55,0.2), transparent)",
            marginBottom: 16,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "1.1rem",
              color: "#D4AF37",
            }}
          >
            {priceDisplay}
          </span>

          <Link
            href={`/cars/${vehicle.slug}`}
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#D4AF37",
              textDecoration: "none",
              fontWeight: 400,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "clamp(60px,10vh,120px) 0",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          marginBottom: 32,
          opacity: 0.4,
        }}
      >
        <CarIcon size={80} />
      </div>
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "clamp(1.5rem,3vw,2.2rem)",
          color: "rgba(255,255,255,0.6)",
          marginBottom: 16,
          lineHeight: 1.3,
        }}
      >
        Collection Being Updated
      </h3>
      <p
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.35)",
          fontWeight: 300,
          maxWidth: 420,
          margin: "0 auto 36px",
          lineHeight: 1.7,
        }}
      >
        Our vehicle collection is being updated. Contact us for immediate
        recommendations.
      </p>
      <Link
        href="/contact"
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: "#D4AF37",
          color: "#0a0a0c",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 400,
          padding: "14px 36px",
          textDecoration: "none",
          boxShadow: "0 8px 28px rgba(212,175,55,0.2)",
          borderRadius: 2,
        }}
      >
        Contact Us
      </Link>
    </div>
  );
}

export default function CarsClient({ vehicles, total, currentParams }: Props) {
  const router = useRouter();

  function handleFilter(key: string, value: string) {
    const params = new URLSearchParams();
    const merged = { ...currentParams, [key]: value };
    Object.entries(merged).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    const qs = params.toString();
    router.push(`/cars${qs ? `?${qs}` : ""}`);
  }

  return (
    <>
      <HeroSection />
      <FilterBar currentParams={currentParams} onFilter={handleFilter} />

      <section
        style={{
          background: "#111114",
          padding: "clamp(60px,8vh,100px) 0",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 clamp(24px,5vw,80px)",
          }}
        >
          {total > 0 && (
            <div
              style={{
                marginBottom: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.35)",
                  fontWeight: 300,
                }}
              >
                {total} vehicle{total !== 1 ? "s" : ""} available
              </span>
            </div>
          )}

          {vehicles.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="vehicles-grid">
              {vehicles.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sell CTA */}
      <section
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
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)",
          }}
        />
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "0 clamp(24px,5vw,80px)",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#D4AF37",
              fontWeight: 400,
              marginBottom: 20,
            }}
          >
            Sell Your Vehicle
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
              color: "rgba(255,255,255,0.88)",
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            Looking to sell your luxury car?
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.45)",
              fontWeight: 300,
              marginBottom: 36,
              lineHeight: 1.7,
            }}
          >
            Engineering-grade evaluation, access to 7,000+ HNI buyers, and
            zero upfront cost.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/sell-car"
              style={{
                display: "inline-flex",
                background: "#D4AF37",
                color: "#0a0a0c",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 400,
                padding: "14px 36px",
                textDecoration: "none",
                boxShadow: "0 8px 28px rgba(212,175,55,0.2)",
                borderRadius: 2,
              }}
            >
              Sell Your Car
            </Link>
            <Link
              href="/cars/concierge"
              style={{
                display: "inline-flex",
                border: "1px solid rgba(212,175,55,0.4)",
                color: "#D4AF37",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 400,
                padding: "14px 36px",
                textDecoration: "none",
                borderRadius: 2,
              }}
            >
              Ownership Concierge
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .vehicles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .vehicles-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .vehicles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
