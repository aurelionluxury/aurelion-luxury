"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const primaryLinks = [
  { label: "Real Estate", href: "/real-estate", sub: [
    { label: "All Properties", href: "/real-estate" },
    { label: "Sell Your Property", href: "/sell-property" },
    { label: "Mumbai Micro-Market Guide", href: "/mumbai-guide" },
  ]},
  { label: "Automobiles", href: "/cars", sub: [
    { label: "Browse Vehicles", href: "/cars" },
    { label: "Sell Your Car", href: "/sell-car" },
    { label: "Ownership Concierge", href: "/cars/concierge" },
  ]},
  { label: "Financial Services", href: "/financial-services", sub: [
    { label: "Home Loans", href: "/financial-services#home-loans" },
    { label: "Car Loans", href: "/financial-services#car-loans" },
    { label: "Insurance", href: "/financial-services#insurance" },
    { label: "EMI Calculator", href: "/emi-calculator" },
  ]},
  { label: "Mumbai Guide", href: "/mumbai-guide" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const moreLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Our Brokerage Model", href: "/brokerage" },
  { label: "NRI Buyers Guide", href: "/nri-guide" },
  { label: "FAQ", href: "/faq" },
];

const allMobileLinks = [
  ...primaryLinks,
  { label: "About", href: "/about", sub: undefined },
  { label: "Our Team", href: "/team", sub: undefined },
  { label: "Brokerage", href: "/brokerage", sub: undefined },
  { label: "NRI Guide", href: "/nri-guide", sub: undefined },
  { label: "FAQ", href: "/faq", sub: undefined },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openDrop = (label: string) => { if (timerRef.current) clearTimeout(timerRef.current); setActiveDropdown(label); };
  const closeDrop = () => { timerRef.current = setTimeout(() => setActiveDropdown(null), 120); };

  const navBg = scrolled ? "rgba(10,10,12,0.95)" : "transparent";
  const navBorder = scrolled ? "1px solid rgba(212,175,55,0.1)" : "1px solid transparent";

  return (
    <header style={{
      position: "fixed", left: 0, right: 0, zIndex: 40,
      top: scrolled ? 0 : 33,
      background: navBg,
      borderBottom: navBorder,
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      transition: "top 0.4s ease, background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      padding: scrolled ? "12px 0" : "18px 0",
    }}>
      <nav style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", flexDirection: "column", lineHeight: 1, textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, letterSpacing: "0.2em", color: "#D4AF37", textTransform: "uppercase" }}>Aurelion</span>
          <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginTop: 2 }}>Luxury</span>
        </Link>

        {/* Desktop Nav */}
        <ul style={{ display: "flex", alignItems: "center", gap: 28, listStyle: "none", margin: 0, padding: 0 }} className="desktop-nav">
          {primaryLinks.map((link) => (
            <li key={link.label} style={{ position: "relative" }}
              onMouseEnter={() => link.sub && openDrop(link.label)}
              onMouseLeave={() => link.sub && closeDrop()}
            >
              <Link href={link.href} style={{
                fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 400,
                color: "rgba(255,255,255,0.6)", textDecoration: "none", whiteSpace: "nowrap",
                display: "flex", alignItems: "center", gap: 4,
                transition: "color 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4AF37"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
              >
                {link.label}
                {link.sub && <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.4 }}><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>}
              </Link>
              {link.sub && activeDropdown === link.label && (
                <div style={{
                  position: "absolute", top: "100%", left: 0, marginTop: 12, minWidth: 200,
                  background: "rgba(10,10,12,0.98)", border: "1px solid rgba(212,175,55,0.12)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)", backdropFilter: "blur(20px)", padding: "8px 0",
                }}
                  onMouseEnter={() => openDrop(link.label)}
                  onMouseLeave={() => closeDrop()}
                >
                  {link.sub.map(item => (
                    <Link key={item.label} href={item.href} style={{
                      display: "block", padding: "10px 20px", fontSize: 11, letterSpacing: "0.08em",
                      textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none",
                      transition: "color 0.2s, background 0.2s",
                    }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#D4AF37"; el.style.background = "rgba(212,175,55,0.04)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.5)"; el.style.background = "transparent"; }}
                    >{item.label}</Link>
                  ))}
                </div>
              )}
            </li>
          ))}

          {/* More */}
          <li style={{ position: "relative" }}
            onMouseEnter={() => openDrop("More")}
            onMouseLeave={() => closeDrop()}
          >
            <button style={{
              fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 400,
              color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 4, padding: 0,
            }}>
              More <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.4 }}><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            </button>
            {activeDropdown === "More" && (
              <div style={{
                position: "absolute", top: "100%", right: 0, marginTop: 12, minWidth: 180,
                background: "rgba(10,10,12,0.98)", border: "1px solid rgba(212,175,55,0.12)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)", backdropFilter: "blur(20px)", padding: "8px 0",
              }}
                onMouseEnter={() => openDrop("More")}
                onMouseLeave={() => closeDrop()}
              >
                {moreLinks.map(item => (
                  <Link key={item.label} href={item.href} style={{
                    display: "block", padding: "10px 20px", fontSize: 11, letterSpacing: "0.08em",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none",
                    transition: "color 0.2s, background 0.2s",
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#D4AF37"; el.style.background = "rgba(212,175,55,0.04)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.5)"; el.style.background = "transparent"; }}
                  >{item.label}</Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* CTA + Search */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }} className="desktop-cta">
          <Link href="/contact" style={{
            border: "1px solid #D4AF37", color: "#D4AF37", background: "transparent",
            fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 400,
            padding: "8px 16px", textDecoration: "none", borderRadius: 2,
            transition: "all 0.3s ease",
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#D4AF37"; el.style.color = "#0a0a0c"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#D4AF37"; }}
          >
            Book Consultation
          </Link>
          <button aria-label="Search" style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4AF37"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
          >
            <svg viewBox="0 0 20 20" fill="none" width="15" height="15"><circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.4"/><path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"
          style={{ display: "none", flexDirection: "column", gap: 5, padding: 8, background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}
          className="mobile-burger"
        >
          <span style={{ display: "block", height: 1, width: 22, background: "#D4AF37", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none", transition: "transform 0.3s" }} />
          <span style={{ display: "block", height: 1, width: 22, background: "#D4AF37", opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s" }} />
          <span style={{ display: "block", height: 1, width: 22, background: "#D4AF37", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none", transition: "transform 0.3s" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        overflow: "hidden", maxHeight: menuOpen ? 600 : 0, opacity: menuOpen ? 1 : 0,
        transition: "max-height 0.3s ease, opacity 0.3s ease",
        background: "rgba(10,10,12,0.98)", borderTop: "1px solid rgba(212,175,55,0.08)",
      }} className="mobile-menu-panel">
        <div style={{ padding: "20px clamp(24px,5vw,48px) 24px" }}>
          {allMobileLinks.map((link) => (
            <div key={link.label} style={{ marginBottom: 16 }}>
              <Link href={link.href} onClick={() => setMenuOpen(false)} style={{
                display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)", textDecoration: "none", marginBottom: 6, fontWeight: 400,
              }}>{link.label}</Link>
              {"sub" in link && link.sub?.map(item => (
                <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{
                  display: "block", paddingLeft: 16, paddingBottom: 4, fontSize: 11, letterSpacing: "0.06em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.35)", textDecoration: "none",
                }}>{item.label}</Link>
              ))}
            </div>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
            display: "inline-flex", border: "1px solid #D4AF37", color: "#D4AF37", background: "transparent",
            fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 400,
            padding: "10px 22px", marginTop: 8, textDecoration: "none", borderRadius: 2,
          }}>Book Consultation</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
