"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── types ──────────────────────────────────────────────────────── */
interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface Props {
  faqs: FAQ[];
}

/* ─── constants ──────────────────────────────────────────────────── */
const gold = "#D4AF37";
const container: React.CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "0 clamp(24px,5vw,80px)",
};
const eyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: gold,
  fontWeight: 400,
  marginBottom: 20,
  display: "flex",
  alignItems: "center",
  gap: 12,
};

/* ─── seed FAQs ──────────────────────────────────────────────────── */
const seedFAQs: FAQ[] = [
  { id: 1, category: "Real Estate", question: "Is your real estate advisory truly free for buyers?", answer: "For buyers of new construction properties — yes, completely free. Developers include a standard referral commission in their marketing budget, paid directly to us. This does not inflate your purchase price. For rental introductions, our fee is one month's rent (up to 12-month leases) or two months for longer terms — clearly disclosed before engagement." },
  { id: 2, category: "Real Estate", question: "Which areas of Mumbai do you cover?", answer: "We cover the entire Mumbai Metropolitan Region with particular depth in South Mumbai (Worli, Lower Parel, Malabar Hill), the Bandra–Khar–Juhu corridor, Andheri West, Goregaon, and the Borivali–Dahisar belt. For NRI clients we also coordinate across Thane and Navi Mumbai where premium projects are active." },
  { id: 3, category: "Real Estate", question: "What is RERA and why does it matter for buyers?", answer: "RERA — the Real Estate (Regulation and Development) Act — is India's primary buyer protection law. It requires developers to register projects, maintain separate escrow accounts for your funds, and deliver what was approved. We work exclusively with RERA-registered projects, giving you formal legal recourse if a developer deviates from commitments." },
  { id: 4, category: "Real Estate", question: "Do you handle commercial properties?", answer: "Yes, selectively. We work on office spaces, retail units, and investment-grade commercial plots for serious buyers. Commercial transactions carry different documentation and due diligence requirements — we guide you through every step." },
  { id: 5, category: "Automobiles", question: "How do you evaluate a pre-owned luxury vehicle?", answer: "Every pre-owned vehicle we recommend undergoes a structured assessment: engine and transmission health, electrical systems, body inspection for undisclosed accident repairs, service record verification, and RTO documentation audit. Our expert evaluator's engineering background and 15+ years in luxury automobiles means this is a professional evaluation, not a checklist exercise." },
  { id: 6, category: "Automobiles", question: "Can you help me buy a new car from a dealership?", answer: "Yes. We maintain relationships with authorised dealers of leading luxury brands in Mumbai and can often secure preferential allocation for high-demand models. We also negotiate accessories packages and ensure you receive exactly the specification you want. Our advisory is free — the dealer pays our referral fee." },
  { id: 7, category: "Automobiles", question: "How long does selling a car typically take?", answer: "For a well-priced, well-documented luxury vehicle, 4–8 weeks is typical. We introduce your vehicle to our HNI database before any open-market activity, keeping the transaction private and often faster. Timeline depends significantly on your price expectations — vehicles priced at market value move considerably quicker." },
  { id: 8, category: "Financial Services", question: "Are you a licensed insurance advisor?", answer: "Yes. We hold an IRDAI (Insurance Regulatory & Development Authority of India) certification as an insurance advisor. Our recommendations are regulated, commissions are disclosed on request, and you have formal recourse through IRDAI if you are ever dissatisfied with our conduct." },
  { id: 9, category: "Financial Services", question: "How do you help with home loans?", answer: "We submit your loan application simultaneously to 8+ banking partners, allow them to compete for your business, then present you with the best offer. We handle all documentation, coordinate the property legal check, and liaise with the bank throughout processing. You simply review and sign at the end." },
  { id: 10, category: "Financial Services", question: "Do you send reminders for insurance renewals?", answer: "Yes. For all insurance clients we maintain a renewals calendar and contact you at least 45 days before expiry to review coverage and confirm renewal or explore better alternatives. No policy in our care should ever lapse due to a missed renewal date." },
  { id: 11, category: "General", question: "How is Aurelion different from a traditional broker?", answer: "Several meaningful ways. We work across real estate, automobiles, and financial services — understanding your complete picture. We do not list properties on aggregator portals; our work is personal and private. Our expert evaluator's engineering background adds technical dimension most brokers lack. And our zero-fee structure means no incentive to push you toward expensive options." },
  { id: 12, category: "General", question: "What does zero-cost advisory actually mean?", answer: "It means you pay nothing for advisory in most transaction types. For new properties, developers pay our referral fee. For loan referrals, banks pay us. For insurance, insurers pay regulated commissions. The only exceptions are vehicle sales (2–3% on success only) and rental introductions (one month's rent) — both disclosed clearly before engagement." },
  { id: 13, category: "General", question: "How quickly do you respond to enquiries?", answer: "All WhatsApp messages are responded to within 2 hours during business hours (Monday to Saturday, 10am–7pm IST). For formal consultations we typically schedule within 48 hours of your inquiry. We do not use automated responses — you will always speak with someone who knows our work." },
];

const CATEGORIES = ["All", "Real Estate", "Automobiles", "Financial Services", "General"];

/* ─── FadeIn wrapper ─────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── single accordion item ──────────────────────────────────────── */
function FAQItem({ faq, isOpen, onToggle, index }: { faq: FAQ; isOpen: boolean; onToggle: () => void; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "20px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          textAlign: "left",
        }}
      >
        <span style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.85)",
          fontWeight: 300,
          fontFamily: "var(--font-dm-sans, sans-serif)",
          lineHeight: 1.55,
          flex: 1,
        }}>
          {faq.question}
        </span>
        <span style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s ease",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 5L7 10L12 5" stroke="rgba(212,175,55,0.7)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div style={{
        maxHeight: isOpen ? 500 : 0,
        overflow: "hidden",
        transition: "max-height 0.35s ease",
      }}>
        <p style={{
          fontSize: 14,
          fontWeight: 300,
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.75,
          paddingBottom: 20,
          paddingRight: 32,
        }}>
          {faq.answer}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── main component ─────────────────────────────────────────────── */
export default function FAQClient({ faqs }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<number | null>(null);

  const displayFAQs = faqs.length === 0 ? seedFAQs : faqs;
  const filtered = activeCategory === "All"
    ? displayFAQs
    : displayFAQs.filter(f => f.category === activeCategory);

  return (
    <main style={{ background: "#0a0a0c", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section style={{ background: "#0a0a0c", paddingTop: 140, paddingBottom: "clamp(60px,8vh,100px)" }}>
        <div style={container}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={eyebrow}>
              <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
              Help Centre
              <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(2.8rem,6vw,5rem)", lineHeight: 1.12,
              color: "rgba(255,255,255,0.88)", maxWidth: 680,
            }}
          >
            Frequently Asked{" "}
            <em style={{ color: gold, fontStyle: "italic" }}>Questions</em>
          </motion.h1>
        </div>
      </section>

      {/* ── Category tabs (sticky) ── */}
      <div style={{
        position: "sticky",
        top: 80,
        zIndex: 40,
        background: "rgba(10,10,12,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ ...container }}>
          <div style={{ display: "flex", gap: 0, overflowX: "auto", scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenId(null); }}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: activeCategory === cat ? `2px solid ${gold}` : "2px solid transparent",
                  color: activeCategory === cat ? gold : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  padding: "16px 20px",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ Accordion ── */}
      <section style={{ background: "#111114", padding: "clamp(60px,8vh,100px) 0" }}>
        <div style={{ ...container, maxWidth: 860, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
          {filtered.length === 0 ? (
            <FadeIn>
              <p style={{ color: "rgba(255,255,255,0.35)", fontWeight: 300, fontSize: 15, textAlign: "center", padding: "40px 0" }}>
                No questions in this category yet.
              </p>
            </FadeIn>
          ) : (
            filtered.map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                index={i}
              />
            ))
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ background: "#0a0a0c", padding: "clamp(80px,10vh,120px) 0" }}>
        <div style={{ ...container, textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: gold, marginBottom: 16, fontWeight: 400 }}>
              Still have questions?
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "rgba(255,255,255,0.88)",
              marginBottom: 24, lineHeight: 1.3,
            }}>
              We reply within 2 hours
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 32, maxWidth: 460, margin: "0 auto 32px" }}>
              Mon–Sat, 10am–7pm IST. Every message is read and answered personally.
            </p>
            <a href="/contact" style={{
              display: "inline-block",
              background: gold,
              color: "#0a0a0c",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 400,
              padding: "14px 36px",
              textDecoration: "none",
              transition: "background 0.25s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#E8D5A3"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = gold; }}
            >
              Ask Your Question
            </a>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
