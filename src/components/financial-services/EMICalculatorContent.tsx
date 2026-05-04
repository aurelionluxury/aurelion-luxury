"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/* ─── shared constants ─────────────────────────────────────────── */
const gold = "#D4AF37";
const glass: React.CSSProperties = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 12,
  backdropFilter: "blur(20px)",
};
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

/* ─── formatINR ─────────────────────────────────────────────────── */
function formatINR(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(2)} L`;
  return `₹${amount.toFixed(0)}`;
}

/* ─── EMI calculation ───────────────────────────────────────────── */
function calcEMI(principal: number, annualRate: number, tenureYears: number) {
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  if (r === 0) return { emi: principal / n, totalPayment: principal, totalInterest: 0 };
  const pow = Math.pow(1 + r, n);
  const emi = (principal * r * pow) / (pow - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;
  return { emi, totalPayment, totalInterest };
}

/* ─── slider component ──────────────────────────────────────────── */
interface SliderProps {
  label: string;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  minLabel: string;
  maxLabel: string;
}

function Slider({ label, displayValue, min, max, step, value, onChange, minLabel, maxLabel }: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "baseline" }}>
        <label style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>
          {label}
        </label>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: gold, fontWeight: 300 }}>
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        className="emi-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          height: 2,
          background: `linear-gradient(to right, ${gold} ${percent}%, rgba(255,255,255,0.1) ${percent}%)`,
          outline: "none",
          WebkitAppearance: "none",
          cursor: "pointer",
          borderRadius: 2,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>{minLabel}</span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>{maxLabel}</span>
      </div>
    </div>
  );
}

/* ─── fade-in wrapper ───────────────────────────────────────────── */
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

/* ─── main component ─────────────────────────────────────────────── */
export default function EMICalculatorContent() {
  const [loanAmount, setLoanAmount] = useState(7_500_000);
  const [interestRate, setInterestRate] = useState(8.75);
  const [tenure, setTenure] = useState(20);

  const { emi, totalPayment, totalInterest } = useMemo(
    () => calcEMI(loanAmount, interestRate, tenure),
    [loanAmount, interestRate, tenure]
  );

  const principalPercent = Math.round((loanAmount / totalPayment) * 100);
  const interestPercent = 100 - principalPercent;

  return (
    <main style={{ background: "#0a0a0c", minHeight: "100vh" }}>
      <style>{`
        .emi-slider { -webkit-appearance: none; width: 100%; height: 2px; outline: none; cursor: pointer; border-radius: 2px; }
        .emi-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; background: #D4AF37; border-radius: 50%; cursor: pointer; box-shadow: 0 0 8px rgba(212,175,55,0.4); }
        .emi-slider::-moz-range-thumb { width: 18px; height: 18px; background: #D4AF37; border-radius: 50%; cursor: pointer; border: none; }
        @media (max-width: 768px) {
          .emi-calc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ background: "#0a0a0c", paddingTop: 140, paddingBottom: "clamp(80px,10vh,120px)" }}>
        <div style={container}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={eyebrow}>
              <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
              Financial Planning
              <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(2.8rem,6vw,5rem)", lineHeight: 1.12,
              color: "rgba(255,255,255,0.88)", marginBottom: 24, maxWidth: 600,
            }}
          >
            EMI{" "}
            <em style={{ color: gold, fontStyle: "italic" }}>Calculator</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300, fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 500 }}
          >
            Plan your home or car loan EMI with precision.{" "}
            <span style={{ color: "rgba(255,255,255,0.85)" }}>All calculations update in real-time.</span>
          </motion.p>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section style={{ background: "#111114", padding: "clamp(80px,12vh,140px) 0" }}>
        <div style={container}>
          <FadeIn>
            <div
              className="emi-calc-grid"
              style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}
            >
              {/* ── Left: Sliders ── */}
              <div style={{ ...glass, padding: 36 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 28, fontWeight: 300 }}>
                  Adjust Parameters
                </p>

                <Slider
                  label="Loan Amount"
                  displayValue={formatINR(loanAmount)}
                  min={1_000_000} max={100_000_000} step={500_000}
                  value={loanAmount} onChange={setLoanAmount}
                  minLabel="₹10 Lakhs" maxLabel="₹10 Crore"
                />
                <Slider
                  label="Interest Rate"
                  displayValue={`${interestRate.toFixed(2)}% p.a.`}
                  min={7} max={14} step={0.25}
                  value={interestRate} onChange={setInterestRate}
                  minLabel="7% p.a." maxLabel="14% p.a."
                />
                <Slider
                  label="Loan Tenure"
                  displayValue={`${tenure} Years`}
                  min={5} max={30} step={1}
                  value={tenure} onChange={setTenure}
                  minLabel="5 Years" maxLabel="30 Years"
                />

                <div style={{
                  marginTop: 8, padding: "16px 0 0",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 300, lineHeight: 1.6,
                }}>
                  Drag the sliders to update the EMI calculation instantly.
                </div>
              </div>

              {/* ── Right: Results ── */}
              <div style={{ ...glass, padding: 36, display: "flex", flexDirection: "column", gap: 0 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 12, fontWeight: 300 }}>
                  Monthly EMI
                </p>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(2.5rem,5vw,3.5rem)",
                  color: gold,
                  lineHeight: 1.1,
                  marginBottom: 24,
                }}>
                  {formatINR(emi)}
                </p>

                <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 24 }} />

                {/* Totals */}
                <div style={{ marginBottom: 24 }}>
                  {[
                    { label: "Total Interest", value: formatINR(totalInterest) },
                    { label: "Total Payment", value: formatINR(totalPayment) },
                  ].map(row => (
                    <div key={row.label} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "baseline",
                      marginBottom: 14,
                    }}>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>{row.label}</span>
                      <span style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", fontWeight: 300, fontFamily: "'Cormorant Garamond', serif" }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Breakdown bar */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: gold, fontWeight: 300, letterSpacing: "0.08em" }}>Principal</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 300, letterSpacing: "0.08em" }}>Interest</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${principalPercent}%`,
                      background: gold,
                      borderRadius: 3,
                      transition: "width 0.4s ease",
                    }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: "rgba(212,175,55,0.7)", fontWeight: 300 }}>{principalPercent}%</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>{interestPercent}%</span>
                  </div>
                </div>

                {/* Effective rate box */}
                <div style={{
                  padding: "14px 16px",
                  background: "rgba(212,175,55,0.04)",
                  border: "1px solid rgba(212,175,55,0.12)",
                  borderRadius: 6,
                }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 4, fontWeight: 300 }}>
                    Effective Annual Rate
                  </div>
                  <div style={{ fontSize: "1.1rem", fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.8)", fontWeight: 300 }}>
                    {interestRate.toFixed(2)}% p.a. (flat)
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ background: "#0a0a0c", padding: "clamp(80px,12vh,140px) 0" }}>
        <div style={{ ...container, textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <FadeIn>
            <div style={eyebrow}>
              <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
              Better Rates Available
              <div style={{ height: 1, width: 24, background: "rgba(212,175,55,0.5)" }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "rgba(255,255,255,0.88)",
              lineHeight: 1.3, marginBottom: 20,
            }}>
              Our banking partnerships typically achieve<br />
              <em style={{ color: gold, fontStyle: "italic" }}>0.25–0.5% below standard quotes</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontWeight: 300, fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 36 }}>
              On a ₹1 Cr loan at 8.75%, that&apos;s <span style={{ color: "rgba(255,255,255,0.8)" }}>₹25,000+ saved annually.</span>
              <br />Our service is completely free — lenders pay our referral fee.
            </p>
            <Link href="/financial-services" style={{
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
              Talk to Our Loan Advisor
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
