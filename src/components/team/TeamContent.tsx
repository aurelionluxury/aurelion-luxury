"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const gold = "#D4AF37";
const textPrimary = "rgba(255,255,255,0.88)";
const textSecondary = "rgba(255,255,255,0.55)";

const container: React.CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "0 clamp(24px,5vw,80px)",
};

interface Member {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  image: string | null;
  email: string | null;
  linkedin: string | null;
  phone: string | null;
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

function MemberCard({ member, index }: { member: Member; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [hov, setHov] = useState(false);

  const bio = member.bio || "";
  const isLong = bio.length > 220;
  const displayBio = isLong && !expanded ? bio.slice(0, 220) + "…" : bio;

  return (
    <FadeUp delay={index * 0.1}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          border: `1px solid ${hov ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.06)"}`,
          borderRadius: 12,
          overflow: "hidden",
          backdropFilter: "blur(20px)",
          boxShadow: hov ? "0 12px 48px rgba(212,175,55,0.08)" : "0 4px 24px rgba(0,0,0,0.3)",
          transition: "border-color 0.4s, box-shadow 0.4s, transform 0.4s",
          transform: hov ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Photo */}
        <div
          style={{
            height: 300,
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #0a1628 0%, #0a0a0c 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transform: hov ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1)",
              }}
            />
          ) : (
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: "1px solid rgba(212,175,55,0.3)",
                background: "radial-gradient(circle at 40% 40%, rgba(212,175,55,0.1) 0%, rgba(10,10,12,0.9) 70%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "3rem",
                  color: gold,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {member.name[0]}
              </span>
            </div>
          )}
          {/* gradient overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: "linear-gradient(to bottom, transparent, rgba(10,10,12,0.6))",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: "24px 28px 28px" }}>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "1.35rem",
              color: textPrimary,
              marginBottom: 6,
              lineHeight: 1.2,
            }}
          >
            {member.name}
          </h3>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: gold,
              fontWeight: 400,
              marginBottom: 16,
            }}
          >
            {member.title}
          </p>

          {bio && (
            <div style={{ marginBottom: 20 }}>
              <p
                style={{
                  fontSize: 14,
                  color: textSecondary,
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                {displayBio}
              </p>
              {isLong && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  style={{
                    background: "none",
                    border: "none",
                    color: gold,
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                    padding: "6px 0 0",
                    fontFamily: "inherit",
                  }}
                >
                  {expanded ? "Show less ↑" : "Read more →"}
                </button>
              )}
            </div>
          )}

          {/* Social icons */}
          {(member.email || member.linkedin || member.phone) && (
            <div
              style={{
                display: "flex",
                gap: 12,
                paddingTop: 16,
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  title={member.email}
                  style={{ color: "rgba(212,175,55,0.5)", transition: "color 0.2s", lineHeight: 1 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = gold; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(212,175,55,0.5)"; }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="4" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.3" fill="none" />
                    <path d="M2 5l7 5 7-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  style={{ color: "rgba(212,175,55,0.5)", transition: "color 0.2s", lineHeight: 1 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = gold; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(212,175,55,0.5)"; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  title={member.phone}
                  style={{ color: "rgba(212,175,55,0.5)", transition: "color 0.2s", lineHeight: 1 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = gold; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(212,175,55,0.5)"; }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 3h4l1.5 3.5-2 1.5c1 2 2.5 3.5 4.5 4.5l1.5-2L16 12v4c0 .5-.5 1-1 1C6 17 1 12 1 4c0-.5.5-1 1-1h1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </FadeUp>
  );
}

export default function TeamContent({ members }: { members: Member[] }) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });

  return (
    <div style={{ background: "#0a0a0c", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400&display=swap');
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 64px;
        }
        @media (max-width: 1024px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .team-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Hero */}
      <section
        ref={heroRef}
        style={{
          background: "#0a0a0c",
          paddingTop: 140,
          paddingBottom: "clamp(60px,8vh,100px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ ...container, position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p
              style={{
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: gold,
                fontWeight: 400,
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 16,
              }}
            >
              The People Behind Aurelion
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
                lineHeight: 1.15,
                color: textPrimary,
                margin: "0 0 24px",
              }}
            >
              Our{" "}
              <em style={{ fontStyle: "italic", color: gold }}>Team</em>
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 16,
                color: textSecondary,
                maxWidth: 520,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Precision, principle, and fifteen years of lived experience in
              luxury markets. Every recommendation is personal — and ours to stand behind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team grid */}
      <section style={{ background: "#0a0a0c", paddingBottom: "clamp(80px,12vh,140px)" }}>
        <div style={container}>
          {members.length > 0 ? (
            <div className="team-grid">
              {members.map((m, i) => (
                <MemberCard key={m.id} member={m} index={i} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: textSecondary,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.4rem",
                fontWeight: 300,
              }}
            >
              Our team profiles are being prepared.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#111114",
          padding: "clamp(60px,8vh,100px) 0",
          borderTop: "1px solid rgba(212,175,55,0.06)",
        }}
      >
        <div style={{ ...container, textAlign: "center" }}>
          <FadeUp>
            <p
              style={{
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: gold,
                marginBottom: 16,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Join Our Team
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: textPrimary,
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              Want to work with{" "}
              <em style={{ fontStyle: "italic", color: gold }}>Aurelion?</em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 15,
                color: textSecondary,
                maxWidth: 480,
                margin: "0 auto 36px",
                lineHeight: 1.75,
              }}
            >
              We are always open to connecting with exceptional professionals
              who share our commitment to client-first advisory.
            </p>
            <Link
              href="/contact"
              style={{
                background: gold,
                color: "#0a0a0c",
                padding: "13px 32px",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              Get in Touch
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
