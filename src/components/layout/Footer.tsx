import Link from "next/link";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/aurelionluxury", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { label: "LinkedIn", href: "https://linkedin.com/company/aurelionluxury", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: "YouTube", href: "https://youtube.com/@aurelionluxury", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0c", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "56px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, letterSpacing: "0.2em", color: "#D4AF37", textTransform: "uppercase" }}>Aurelion</p>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginTop: 2 }}>Luxury</p>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginBottom: 16 }}>
              Mumbai&apos;s premier luxury concierge brokerage. Zero brokerage for clients.
            </p>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#D4AF37", marginBottom: 16, opacity: 0.8 }}>
              Mumbai &nbsp;·&nbsp; <span style={{ color: "rgba(255,255,255,0.3)" }}>Coming Soon: Pune · Dubai</span>
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width: 30, height: 30, border: "1px solid rgba(212,175,55,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s, border-color 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#D4AF37"; el.style.borderColor = "rgba(212,175,55,0.5)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.35)"; el.style.borderColor = "rgba(212,175,55,0.18)"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Real Estate */}
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16, fontWeight: 400, opacity: 0.85 }}>Real Estate</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[["All Properties","/real-estate"],["Luxury Apartments","/real-estate"],["Villas & Penthouses","/real-estate"],["Sell Your Property","/sell-property"],["Mumbai Guide","/mumbai-guide"]].map(([l,h]) => (
                <li key={l}><Link href={h} style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4AF37"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)"; }}>{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Automobiles + Financial */}
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16, fontWeight: 400, opacity: 0.85 }}>Automobiles</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {[["Browse Cars","/cars"],["Sell Your Car","/sell-car"],["EMI Calculator","/emi-calculator"]].map(([l,h]) => (
                <li key={l}><Link href={h} style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4AF37"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)"; }}>{l}</Link></li>
              ))}
            </ul>
            <h4 style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16, fontWeight: 400, opacity: 0.85 }}>Financial</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Home Loans","/financial-services"],["Car Loans","/financial-services"],["Insurance Advisory","/financial-services"],["EMI Calculator","/emi-calculator"]].map(([l,h]) => (
                <li key={l}><Link href={h} style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4AF37"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)"; }}>{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company + IRDAI */}
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 16, fontWeight: 400, opacity: 0.85 }}>Company</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {[["About Us","/about"],["Our Team","/team"],["Brokerage Model","/brokerage"],["NRI Buyers Guide","/nri-guide"],["Blog & Insights","/blog"],["FAQ","/faq"],["Contact","/contact"]].map(([l,h]) => (
                <li key={l}><Link href={h} style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4AF37"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)"; }}>{l}</Link></li>
              ))}
            </ul>
            {/* IRDAI */}
            <div style={{ border: "1px solid rgba(212,175,55,0.15)", padding: "14px 16px", background: "rgba(212,175,55,0.02)" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, border: "1px solid rgba(212,175,55,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" width="12" height="12"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="#D4AF37" opacity="0.8"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4AF37", fontWeight: 400, marginBottom: 4 }}>IRDAI Certified</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>Insurance Regulatory &amp; Development Authority — Certified Insurance Advisor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "16px clamp(24px,5vw,80px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© {new Date().getFullYear()} Aurelion Luxury. All rights reserved. Mumbai, India.</p>
        <div style={{ display: "flex", gap: 20 }}>
          {[["Privacy Policy","/privacy"],["Terms of Service","/terms"]].map(([l,h]) => (
            <Link key={l} href={h} style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D4AF37"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}>{l}</Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
