"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const PARTICLES = [
  { id: 0, left: "10%", delay: "0s",    duration: "8s",  size: 2, opacity: 0.30 },
  { id: 1, left: "25%", delay: "2s",    duration: "12s", size: 2, opacity: 0.38 },
  { id: 2, left: "45%", delay: "4s",    duration: "10s", size: 3, opacity: 0.30 },
  { id: 3, left: "65%", delay: "1s",    duration: "14s", size: 2, opacity: 0.38 },
  { id: 4, left: "80%", delay: "3s",    duration: "9s",  size: 2, opacity: 0.30 },
  { id: 5, left: "15%", delay: "5s",    duration: "11s", size: 3, opacity: 0.38 },
  { id: 6, left: "55%", delay: "2.5s",  duration: "13s", size: 2, opacity: 0.30 },
  { id: 7, left: "35%", delay: "4.5s",  duration: "8s",  size: 2, opacity: 0.38 },
  { id: 8, left: "75%", delay: "1.5s",  duration: "15s", size: 3, opacity: 0.30 },
  { id: 9, left: "90%", delay: "3.5s",  duration: "10s", size: 2, opacity: 0.38 },
  { id: 10, left: "5%",  delay: "0.5s", duration: "12s", size: 2, opacity: 0.30 },
  { id: 11, left: "50%", delay: "2s",   duration: "9s",  size: 2, opacity: 0.38 },
];

const goldGrad: React.CSSProperties = {
  background: "linear-gradient(135deg, #B8956A 0%, #E8D5A3 40%, #D4AF37 70%, #E8D5A3 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subtitle?: string;
  btn1Text?: string;
  btn1Link?: string;
  btn2Text?: string;
  btn2Link?: string;
}

export default function HeroSection({
  eyebrow = "Complimentary Advisory for Discerning Families",
  headline = "Your single point advisor for luxury homes, performance vehicles & wealth protection",
  subtitle = "Developer & dealer funded advisory in Mumbai — at zero cost to you.",
  btn1Text = "Explore Properties",
  btn1Link = "/real-estate",
  btn2Text = "Schedule Consultation",
  btn2Link = "/contact",
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const el = sectionRef.current;
    const handleMove = (e: MouseEvent) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    el?.addEventListener("mousemove", handleMove);
    return () => el?.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0c" }}
    >
      {/* Mumbai skyline background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=80"
          alt=""
          fill
          style={{ objectFit: "cover", opacity: 0.08 }}
          priority
        />
      </div>
      {/* Ambient gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 60%)"
      }} />
      {/* Mouse spotlight */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 500px 350px at ${mouse.x}% ${mouse.y}%, rgba(212,175,55,0.045) 0%, transparent 70%)`
      }} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: p.left, bottom: 0,
            width: p.size, height: p.size,
            background: "#D4AF37",
            opacity: p.opacity,
            animationName: "particleDrift",
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }} />
        ))}
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.05), transparent)" }} />
        <div className="absolute top-0 right-1/4 w-px h-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.04), transparent)" }} />
      </div>

      {/* Corner brackets */}
      {[["top-20 left-6","border-l border-t"],["top-20 right-6","border-r border-t"],["bottom-12 left-6","border-l border-b"],["bottom-12 right-6","border-r border-b"]].map(([pos, borders]) => (
        <div key={pos} className={`absolute ${pos} w-10 h-10 ${borders} pointer-events-none`} style={{ borderColor: "rgba(212,175,55,0.18)" }} />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-6" style={{ background: "rgba(212,175,55,0.5)" }} />
          <span style={{ fontSize: 12, letterSpacing: "0.15em", color: "#D4AF37", textTransform: "uppercase", fontWeight: 400 }}>
            {eyebrow}
          </span>
          <div className="h-px w-6" style={{ background: "rgba(212,175,55,0.5)" }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2.4rem, 5vw, 5rem)",
            lineHeight: 1.18,
            marginBottom: "1.5rem",
            color: "rgba(255,255,255,0.88)",
            ...goldGrad,
          }}
        >
          {headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 2.5rem", letterSpacing: "0.01em" }}
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href={btn1Link} style={{
            background: "#D4AF37", color: "#0a0a0c",
            fontWeight: 400, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "14px 32px", display: "inline-flex", alignItems: "center",
            transition: "background 0.3s ease", fontFamily: "var(--font-dm-sans)",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#E8D5A3"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#D4AF37"; }}
          >
            {btn1Text}
          </Link>
          <Link href={btn2Link} style={{
            border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37",
            fontWeight: 400, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "14px 32px", display: "inline-flex", alignItems: "center",
            background: "transparent", transition: "background 0.3s ease",
            fontFamily: "var(--font-dm-sans)",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            {btn2Text}
          </Link>
        </motion.div>
      </div>

      {/* Scroll chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 6l6 6 6-6" stroke="rgba(212,175,55,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        <span style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Scroll</span>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, #0a0a0c, transparent)" }} />

      <style>{`
        @keyframes particleDrift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          8% { opacity: var(--pop, 0.4); }
          88% { opacity: var(--pop, 0.4); }
          100% { transform: translateY(-100vh) translateX(15px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
