"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
  interiorColor: string | null;
  engine: string | null;
  power: string | null;
  features: string | null;
  images: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  vehicle: Vehicle;
  similar: Vehicle[];
};

function CarSVG({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size * 2}
      height={size}
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 64 L36 36 Q44 24 60 24 L140 24 Q156 24 164 36 L180 64 L188 64 Q192 64 192 68 L192 76 Q192 80 188 80 L176 80 Q172 92 160 92 Q148 92 144 80 L56 80 Q52 92 40 92 Q28 92 24 80 L12 80 Q8 80 8 76 L8 68 Q8 64 12 64 Z"
        fill="rgba(212,175,55,0.3)"
      />
      <circle cx="40" cy="84" r="8" fill="rgba(212,175,55,0.25)" />
      <circle cx="160" cy="84" r="8" fill="rgba(212,175,55,0.25)" />
      <path
        d="M60 36 L75 24 L125 24 L140 36 Z"
        fill="rgba(212,175,55,0.15)"
      />
      <path
        d="M70 36 L80 26 L120 26 L130 36 Z"
        fill="rgba(212,175,55,0.1)"
      />
    </svg>
  );
}

function parseFeatures(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // not JSON — split by comma/newline
  }
  return raw
    .split(/[,\n;]+/)
    .map((f) => f.trim())
    .filter(Boolean);
}

type InquiryForm = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

function InquiryCard({ vehicle }: { vehicle: Vehicle }) {
  const [form, setForm] = useState<InquiryForm>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const priceDisplay =
    vehicle.priceLabel ||
    `₹${(vehicle.price / 100000).toFixed(0)} Lakhs`;

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
    marginBottom: 10,
    boxSizing: "border-box",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: "automobiles",
          message: form.message,
          vehicleId: vehicle.id,
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
    <div
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        backdropFilter: "blur(20px)",
        padding: "32px 28px",
        position: "sticky",
        top: 100,
      }}
    >
      {/* Price */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "2rem",
          color: "#D4AF37",
          marginBottom: 6,
          lineHeight: 1,
        }}
      >
        {priceDisplay}
      </div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          fontWeight: 300,
          marginBottom: 24,
        }}
      >
        Asking Price
      </div>

      <div
        style={{
          height: 1,
          background:
            "linear-gradient(to right, rgba(212,175,55,0.2), transparent)",
          marginBottom: 24,
        }}
      />

      {submitted ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div
            style={{
              fontSize: 28,
              marginBottom: 12,
            }}
          >
            ✓
          </div>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Thank you. We will be in touch within 2 hours with full vehicle
            details.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#D4AF37",
              fontWeight: 400,
              marginBottom: 20,
            }}
          >
            Request Vehicle Details
          </h3>

          <input
            style={inputStyle}
            placeholder="Your Name *"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Phone Number *"
            value={form.phone}
            required
            type="tel"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Email (optional)"
            value={form.email}
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            style={{ ...inputStyle, height: 80, resize: "vertical" }}
            placeholder="Message (optional)"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          {error && (
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,100,100,0.8)",
                marginBottom: 10,
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
              padding: "14px 20px",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 400,
              cursor: submitting ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              borderRadius: 2,
              boxShadow: "0 6px 24px rgba(212,175,55,0.2)",
              transition: "background 0.3s ease",
            }}
          >
            {submitting ? "Sending…" : "Request Details"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function CarDetailClient({ vehicle, similar }: Props) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.1 });

  const features = parseFeatures(vehicle.features);

  const specs = [
    { label: "Year", value: vehicle.year.toString() },
    { label: "Mileage", value: vehicle.mileage ? `${vehicle.mileage.toLocaleString("en-IN")} km` : "—" },
    { label: "Fuel", value: vehicle.fuel || "—" },
    { label: "Transmission", value: vehicle.transmission || "—" },
    { label: "Colour", value: vehicle.color || "—" },
  ];

  return (
    <>
      {/* Hero image area */}
      <section
        ref={heroRef}
        style={{
          background: "linear-gradient(145deg, #0d1f3c 0%, #0a0a0c 80%)",
          paddingTop: 140,
          paddingBottom: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 60% at 50% 40%, rgba(212,175,55,0.04) 0%, transparent 70%)",
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
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 24 }}
          >
            <Link
              href="/cars"
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                fontWeight: 300,
                letterSpacing: "0.05em",
              }}
            >
              Automobiles
            </Link>
            <span
              style={{
                color: "rgba(255,255,255,0.2)",
                margin: "0 8px",
                fontSize: 12,
              }}
            >
              /
            </span>
            <span
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                fontWeight: 300,
              }}
            >
              {vehicle.title}
            </span>
          </motion.div>
        </div>

        {/* Large vehicle image placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            height: 460,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <CarSVG size={80} />

          {/* Condition badge */}
          <span
            style={{
              position: "absolute",
              top: 24,
              right: "clamp(24px,5vw,80px)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "5px 14px",
              borderRadius: 20,
              fontWeight: 400,
              ...(vehicle.condition === "New"
                ? {
                    border: "1px solid rgba(212,175,55,0.6)",
                    color: "#D4AF37",
                    background: "rgba(212,175,55,0.1)",
                  }
                : {
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.05)",
                  }),
            }}
          >
            {vehicle.condition}
          </span>
        </motion.div>

        {/* Specs bar */}
        <div
          style={{
            background: "rgba(0,0,0,0.4)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              padding: "0 clamp(24px,5vw,80px)",
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 0,
            }}
          >
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                style={{
                  padding: "20px 16px",
                  borderRight:
                    i < specs.length - 1
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    fontWeight: 300,
                    marginBottom: 6,
                  }}
                >
                  {spec.label}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 300,
                  }}
                >
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section
        ref={contentRef}
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
          <div className="car-detail-grid">
            {/* Left: info */}
            <div>
              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 24,
                }}
              >
                {[
                  vehicle.year.toString(),
                  vehicle.condition,
                  vehicle.type,
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#D4AF37",
                      border: "1px solid rgba(212,175,55,0.3)",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontWeight: 400,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.05 }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(2rem,4vw,2.5rem)",
                  color: "rgba(255,255,255,0.88)",
                  marginBottom: 8,
                  lineHeight: 1.15,
                }}
              >
                {vehicle.title}
              </motion.h1>

              {vehicle.variant && (
                <p
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 300,
                    marginBottom: 28,
                  }}
                >
                  {vehicle.variant}
                </p>
              )}

              <div
                style={{
                  height: 1,
                  background:
                    "linear-gradient(to right, rgba(212,175,55,0.2), transparent)",
                  marginBottom: 28,
                }}
              />

              {/* Description */}
              {vehicle.description && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.12 }}
                  style={{
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: "rgba(255,255,255,0.55)",
                    fontWeight: 300,
                    marginBottom: 32,
                  }}
                >
                  {vehicle.description}
                </motion.p>
              )}

              {/* Features */}
              {features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.18 }}
                >
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "1.2rem",
                      color: "rgba(255,255,255,0.75)",
                      marginBottom: 16,
                      letterSpacing: "0.03em",
                    }}
                  >
                    Features &amp; Highlights
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(220px, 1fr))",
                      gap: "10px 20px",
                    }}
                  >
                    {features.map((feature, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: 300,
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            color: "#D4AF37",
                            fontSize: 8,
                            marginTop: 5,
                            flexShrink: 0,
                          }}
                        >
                          ◆
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Right: inquiry form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <InquiryCard vehicle={vehicle} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Similar vehicles */}
      {similar.length > 0 && (
        <section
          style={{
            background: "#0a0a0c",
            padding: "clamp(60px,8vh,100px) 0",
            position: "relative",
          }}
        >
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
              maxWidth: 1400,
              margin: "0 auto",
              padding: "0 clamp(24px,5vw,80px)",
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
                marginBottom: 16,
              }}
            >
              Also Available
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(1.5rem,3vw,2.2rem)",
                color: "rgba(255,255,255,0.88)",
                marginBottom: 36,
              }}
            >
              Similar Vehicles
            </h2>

            <div className="similar-grid">
              {similar.map((v) => (
                <Link
                  key={v.id}
                  href={`/cars/${v.slug}`}
                  className="similar-card"
                  style={{
                    display: "block",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 12,
                    overflow: "hidden",
                    textDecoration: "none",
                    transition:
                      "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      height: 180,
                      background:
                        "linear-gradient(145deg, #0d1f3c 0%, #0a0a0c 80%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CarSVG size={44} />
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#D4AF37",
                        fontWeight: 400,
                        marginBottom: 6,
                      }}
                    >
                      {v.year} · {v.make}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 300,
                        fontSize: "1.1rem",
                        color: "rgba(255,255,255,0.88)",
                        marginBottom: 8,
                      }}
                    >
                      {v.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 300,
                        fontSize: "1rem",
                        color: "#D4AF37",
                      }}
                    >
                      {v.priceLabel || `₹${(v.price / 100000).toFixed(0)} L`}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .car-detail-grid {
          display: grid;
          grid-template-columns: 60fr 40fr;
          gap: clamp(32px, 5vw, 60px);
          align-items: start;
        }
        .similar-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .similar-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212,175,55,0.25) !important;
          box-shadow: 0 12px 40px rgba(212,175,55,0.08);
        }
        @media (max-width: 900px) {
          .car-detail-grid {
            grid-template-columns: 1fr;
          }
          .similar-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .car-detail-grid > div:last-child {
            order: -1;
          }
        }
      `}</style>
    </>
  );
}
