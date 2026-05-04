"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Icons
function ShieldIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ToolIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

const services = [
  {
    icon: <ShieldIcon />,
    title: "Ceramic Coating & PPF",
    description:
      "Paint Protection Film and ceramic coating from Mumbai's certified studios. We arrange quotes from 3 vetted specialists, coordinate your booking, and inspect the completed work before you collect the vehicle.",
  },
  {
    icon: <StarIcon />,
    title: "Lifestyle Accessories",
    description:
      "From OEM accessories to premium aftermarket upgrades — dashcams, ambient lighting, carbon fibre trim, custom floor mats. Sourced correctly for your specific model, fitted by specialists who know the car.",
  },
  {
    icon: <ToolIcon />,
    title: "Service Coordination",
    description:
      "For post-warranty vehicles, we identify independent workshops with brand-specific expertise and genuine parts. We monitor the job, review the invoice, and verify work quality before delivery.",
  },
  {
    icon: <DocumentIcon />,
    title: "RTO & Documentation",
    description:
      "Registration renewal, NOC processing, hypothecation removal, address changes — all RTO coordination handled through our experienced agents. Send us documents; collect results.",
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
          Beyond the Purchase
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
          Ownership{" "}
          <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Concierge</em>
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
            maxWidth: 560,
            marginBottom: 40,
          }}
        >
          We arrange Mumbai&apos;s finest vehicle care specialists for you.
          You drive — we manage everything else.
        </motion.p>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            border: "1px solid rgba(212,175,55,0.2)",
            background: "rgba(212,175,55,0.03)",
            borderRadius: 8,
            padding: "16px 20px",
            maxWidth: 660,
          }}
        >
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.45)",
              fontWeight: 300,
              margin: 0,
            }}
          >
            <span
              style={{
                color: "rgba(212,175,55,0.7)",
                fontWeight: 400,
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "inline-block",
                marginRight: 8,
              }}
            >
              Note
            </span>
            Aurelion does not perform any of these services directly. We
            identify, vet, and coordinate the best specialists in
            Mumbai&apos;s luxury automotive ecosystem on your behalf.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
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
        <div className="concierge-grid">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="concierge-card"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                backdropFilter: "blur(20px)",
                padding: "36px 32px",
                transition:
                  "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div style={{ marginBottom: 24 }}>{service.icon}</div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "1.35rem",
                  color: "rgba(255,255,255,0.88)",
                  marginBottom: 14,
                  lineHeight: 1.3,
                }}
              >
                {service.title}
              </h3>

              <div
                style={{
                  width: 32,
                  height: 1,
                  background: "rgba(212,175,55,0.3)",
                  marginBottom: 16,
                }}
              />

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 300,
                }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
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
          maxWidth: 680,
          margin: "0 auto",
          padding: "0 clamp(24px,5vw,80px)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
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
            marginBottom: 20,
          }}
        >
          Get Started
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          Tell us what your vehicle needs
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0.2, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            width: 40,
            height: 1,
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
            color: "rgba(255,255,255,0.45)",
            fontWeight: 300,
            marginBottom: 40,
          }}
        >
          Share your requirements and we will arrange the right specialists.
          No commitments until you are comfortable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.36 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
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
              padding: "15px 40px",
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(212,175,55,0.2)",
              transition: "background 0.3s ease, box-shadow 0.3s ease",
              borderRadius: 2,
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
            Get in Touch
          </Link>
          <Link
            href="/cars"
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid rgba(212,175,55,0.4)",
              color: "#D4AF37",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 400,
              padding: "15px 40px",
              textDecoration: "none",
              transition: "border-color 0.3s ease, background 0.3s ease",
              borderRadius: 2,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(212,175,55,0.7)";
              el.style.background = "rgba(212,175,55,0.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(212,175,55,0.4)";
              el.style.background = "transparent";
            }}
          >
            View Automobiles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function ConciergeContent() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CTASection />

      <style>{`
        .concierge-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .concierge-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212,175,55,0.2) !important;
          box-shadow: 0 12px 40px rgba(212,175,55,0.08);
        }
        @media (max-width: 700px) {
          .concierge-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
