"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

type Property = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  location: string | null;
  area: string | null;
  type: string | null;
  status: string | null;
  price: number | null;
  priceLabel: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  carpetArea: number | null;
  builtUpArea: number | null;
  facing: string | null;
  amenities: unknown;
  images: unknown;
  featured: boolean;
  developerName: string | null;
  reraNumber: string | null;
  possession: string | null;
};

type Props = {
  property: Property;
  similar: Property[];
};

function formatPrice(price: number | null, priceLabel: string | null): string {
  if (priceLabel) return priceLabel;
  if (!price) return "Price on Request";
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}

function parseAmenities(amenities: unknown): string[] {
  if (!amenities) return [];
  if (Array.isArray(amenities)) return amenities as string[];
  if (typeof amenities === "string") {
    try {
      const parsed = JSON.parse(amenities);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function getFirstImage(raw: unknown): string | null {
  if (!raw || typeof raw !== "string") return null;
  const s = raw.trim();
  if (!s) return null;
  try {
    const arr = JSON.parse(s);
    if (Array.isArray(arr) && arr.length > 0) return String(arr[0]).trim() || null;
    if (typeof arr === "string" && arr.trim()) return arr.trim();
  } catch { /* not JSON */ }
  return s.split(",")[0]?.trim() || null;
}

export default function PropertyDetailClient({ property, similar }: Props) {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.2 });

  const amenities = parseAmenities(property.amenities);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: "real_estate",
          propertyId: property.id,
          source: "property_detail",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
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

  return (
    <div style={{ background: "#0a0a0c", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div
        style={{
          paddingTop: 100,
          paddingBottom: 0,
          background: "#0a0a0c",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 clamp(24px,5vw,80px)",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            <Link href="/real-estate" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
              Properties
            </Link>
            <span>→</span>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>{property.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <section
        ref={heroRef}
        style={{
          paddingTop: 40,
          paddingBottom: 0,
          background: "#0a0a0c",
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
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {(() => {
              const imgSrc = getFirstImage(property.images);
              return (
                <div
                  style={{
                    height: 500,
                    background: "linear-gradient(135deg, #0a1628 0%, #0d0d14 50%, #0a0a0c 100%)",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={property.title}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  )}
                  {!imgSrc && (
                    <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.8">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  )}
                  {property.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: 24,
                        left: 24,
                        background: "rgba(212,175,55,0.15)",
                        border: "1px solid rgba(212,175,55,0.4)",
                        color: "#D4AF37",
                        fontSize: 11,
                        letterSpacing: "0.12em",
                        padding: "6px 14px",
                        textTransform: "uppercase",
                        zIndex: 1,
                      }}
                    >
                      Featured Property
                    </div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        </div>
      </section>

      {/* Specs Bar */}
      <div style={{ background: "#111114", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 clamp(24px,5vw,80px)",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 0,
          }}
          className="specs-bar"
        >
          {[
            { label: "Configuration", value: property.bedrooms ? `${property.bedrooms} BHK` : "—" },
            { label: "Carpet Area", value: property.carpetArea ? `${property.carpetArea.toLocaleString("en-IN")} sqft` : "—" },
            { label: "Price Range", value: formatPrice(property.price, property.priceLabel) },
            { label: "RERA Number", value: property.reraNumber || "On Request" },
          ].map((spec, i) => (
            <div
              key={i}
              style={{
                padding: "24px 20px",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                {spec.label}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.1rem", color: "rgba(255,255,255,0.88)" }}>
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <section
        ref={contentRef}
        style={{
          padding: "clamp(60px,8vh,100px) 0",
          background: "#0a0a0c",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 clamp(24px,5vw,80px)",
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: 60,
            alignItems: "start",
          }}
          className="detail-grid"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(1.8rem,3vw,2.5rem)",
                color: "rgba(255,255,255,0.88)",
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              {property.title}
            </h1>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {property.developerName && (
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#D4AF37",
                    border: "1px solid rgba(212,175,55,0.3)",
                    padding: "4px 10px",
                    borderRadius: 4,
                  }}
                >
                  {property.developerName}
                </span>
              )}
              {property.type && (
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "4px 10px",
                    borderRadius: 4,
                  }}
                >
                  {property.type}
                </span>
              )}
            </div>

            {property.area && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, color: "#D4AF37", fontSize: 14 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {property.area}, Mumbai
              </div>
            )}

            {property.description && (
              <div
                dangerouslySetInnerHTML={{ __html: property.description }}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  marginBottom: 40,
                  fontSize: "1rem",
                }}
              />
            )}

            {amenities.length > 0 && (
              <div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "1.4rem",
                    color: "rgba(255,255,255,0.88)",
                    marginBottom: 20,
                  }}
                >
                  Amenities
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "10px 24px",
                  }}
                >
                  {amenities.map((amenity, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        color: "rgba(255,255,255,0.7)",
                        fontSize: 14,
                        fontWeight: 300,
                      }}
                    >
                      <span style={{ color: "#D4AF37", fontSize: 10 }}>✦</span>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Right — Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ position: "sticky", top: 120 }}
          >
            <div
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                backdropFilter: "blur(20px)",
                padding: "32px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "1.5rem",
                  color: "rgba(255,255,255,0.88)",
                  marginBottom: 8,
                }}
              >
                Request Property Details
              </h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28, fontWeight: 300 }}>
                Our advisor will share full details within 2 hours.
              </p>

              {status === "success" ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                  }}
                >
                  <div style={{ color: "#D4AF37", fontSize: "2rem", marginBottom: 16 }}>✦</div>
                  <p style={{ color: "rgba(255,255,255,0.88)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.2rem", marginBottom: 8 }}>
                    Thank you
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
                    We&apos;ll reach out shortly with complete property details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      style={inputStyle}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      style={inputStyle}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                      Email
                    </label>
                    <input
                      type="email"
                      style={inputStyle}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                      Message
                    </label>
                    <textarea
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical" }}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any specific requirements or questions?"
                    />
                  </div>

                  {status === "error" && (
                    <p style={{ fontSize: 12, color: "#e57373" }}>Something went wrong. Please try again.</p>
                  )}

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
                      width: "100%",
                    }}
                  >
                    {status === "loading" ? "Sending..." : "Request Details"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Similar Properties */}
      {similar.length > 0 && (
        <section style={{ background: "#111114", padding: "clamp(60px,8vh,100px) 0" }}>
          <div
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              padding: "0 clamp(24px,5vw,80px)",
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16 }}>
              You May Also Like
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(1.6rem,3vw,2.2rem)",
                color: "rgba(255,255,255,0.88)",
                marginBottom: 40,
              }}
            >
              Similar Properties
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }} className="similar-grid">
              {similar.map((p) => (
                <Link
                  key={p.id}
                  href={`/real-estate/${p.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 12,
                      overflow: "hidden",
                      transition: "border-color 0.3s, transform 0.3s",
                      display: "flex",
                      gap: 0,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.3)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    }}
                  >
                    {(() => {
                      const thumbSrc = getFirstImage(p.images);
                      return (
                        <div
                          style={{
                            width: 120,
                            flexShrink: 0,
                            background: "linear-gradient(135deg, #0a1628, #0a0a0c)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          {thumbSrc ? (
                            <img src={thumbSrc} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1">
                              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                              <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                          )}
                        </div>
                      );
                    })()}
                    <div style={{ padding: "20px" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1rem", color: "rgba(255,255,255,0.88)", marginBottom: 6 }}>
                        {p.title}
                      </div>
                      {p.area && <div style={{ fontSize: 12, color: "#D4AF37", marginBottom: 6 }}>{p.area}</div>}
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1rem", color: "#D4AF37" }}>
                        {formatPrice(p.price, p.priceLabel)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        @media (max-width: 900px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
          .specs-bar {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .similar-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
