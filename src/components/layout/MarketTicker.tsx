const fallbackItems = [
  { label: "Mumbai Property Index", value: "+8.5% YoY" },
  { label: "Luxury Sales", value: "63% of Total Market" },
  { label: "Pre-Owned Luxury Cars", value: "16% CAGR" },
  { label: "Term Insurance ₹10Cr Cover", value: "From ₹81K/yr" },
  { label: "Bandra-BKC Corridor", value: "3.6% CAGR" },
  { label: "South Mumbai Inventory", value: "Lowest in 5 Years" },
  { label: "Luxury Car Segment", value: "42% Growth YoY" },
];

interface TickerItem { label: string; value: string; }

export default function MarketTicker({ items }: { items?: TickerItem[] }) {
  const tickerItems = items && items.length > 0 ? items : fallbackItems;
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, overflow: "hidden", background: "#0a0a0c", borderBottom: "0.5px solid rgba(212,175,55,0.06)", padding: "5px 0" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to right, #0a0a0c, transparent)", zIndex: 10, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to left, #0a0a0c, transparent)", zIndex: 10, pointerEvents: "none" }} />
      <div className="ticker-scroll" style={{ display: "flex", alignItems: "center", width: "max-content" }}>
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 28px", whiteSpace: "nowrap", flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.32)", letterSpacing: "0.04em" }}>{item.label}</span>
            <span style={{ fontSize: 11, color: "#D4AF37", fontWeight: 400 }}>{item.value}</span>
            <span style={{ fontSize: 11, color: "rgba(212,175,55,0.15)", marginLeft: 12 }}>|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
