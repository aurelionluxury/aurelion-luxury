"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* ── types ── */
interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  author: string | null;
}

interface Props {
  posts: Post[];
  currentCategory: string;
}

/* ── design tokens ── */
const gold = "#D4AF37";
const champagne = "#E8D5A3";
const textPrimary = "rgba(255,255,255,0.88)";
const textSecondary = "rgba(255,255,255,0.55)";
const textMuted = "rgba(255,255,255,0.35)";

const container: React.CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "0 clamp(24px,5vw,80px)",
};

const eyebrowStyle: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: gold,
  fontWeight: 400,
  fontFamily: "'DM Sans', var(--font-body), sans-serif",
  marginBottom: 16,
};

const glassCard: React.CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 12,
  backdropFilter: "blur(20px)",
  overflow: "hidden",
};

/* ── category config ── */
const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "Real Estate", label: "Real Estate" },
  { key: "Automobiles", label: "Automobiles" },
  { key: "Financial Planning", label: "Financial Planning" },
  { key: "Market Trends", label: "Market Trends" },
];

function getCategoryFallbackImage(cat: string | null): string {
  const c = (cat || "").toLowerCase();
  if (c.includes("real_estate") || c.includes("real estate") || c.includes("real-estate")) {
    return "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80";
  }
  if (c.includes("automobile") || c.includes("car")) {
    return "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80";
  }
  return "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80";
}

function getCategoryColor(cat: string | null): string {
  switch (cat) {
    case "Real Estate":
      return "linear-gradient(135deg, #1a2a4a, #2a3a5a)";
    case "Automobiles":
      return "linear-gradient(135deg, #1a2535, #2a3545)";
    case "Financial Planning":
      return "linear-gradient(135deg, #1a2a1a, #1e3a1e)";
    case "Market Trends":
      return "linear-gradient(135deg, #2a1a3a, #3a1a5a)";
    default:
      return "linear-gradient(135deg, #1a1a2a, #2a2a3a)";
  }
}

function getCategoryAccent(cat: string | null): string {
  switch (cat) {
    case "Real Estate":
      return "#4a90d9";
    case "Automobiles":
      return "#7ab3cc";
    case "Financial Planning":
      return "#6abf69";
    case "Market Trends":
      return "#9c6abf";
    default:
      return gold;
  }
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/* ── FadeUp helper ── */
function FadeUp({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── PostCard ── */
function PostCard({ post, index }: { post: Post; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="post-card-wrapper"
    >
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
        <div className="post-card" style={glassCard}>
          {/* image / cover area */}
          <div
            style={{
              height: 220,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src={post.coverImage || getCategoryFallbackImage(post.category)}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
            />
            {/* gradient overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                zIndex: 1,
                background:
                  "linear-gradient(to top, rgba(10,10,12,0.8), transparent)",
              }}
            />
            {/* category badge */}
            {post.category && (
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  zIndex: 2,
                  background: "rgba(10,10,12,0.7)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${getCategoryAccent(post.category)}40`,
                  borderRadius: 4,
                  padding: "4px 10px",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: getCategoryAccent(post.category),
                  fontFamily: "'DM Sans', var(--font-body), sans-serif",
                  fontWeight: 400,
                }}
              >
                {post.category}
              </div>
            )}
          </div>

          {/* content */}
          <div style={{ padding: "20px 22px 24px" }}>
            {/* category tag */}
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: gold,
                fontFamily: "'DM Sans', var(--font-body), sans-serif",
                fontWeight: 400,
                marginBottom: 8,
              }}
            >
              {post.category || "Insights"}
            </p>

            {/* title */}
            <h3
              style={{
                fontFamily:
                  "'Cormorant Garamond', var(--font-heading), serif",
                fontWeight: 300,
                fontSize: "1.3rem",
                color: textPrimary,
                lineHeight: 1.3,
                marginBottom: 10,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.title}
            </h3>

            {/* excerpt */}
            {post.excerpt && (
              <p
                style={{
                  fontSize: 13,
                  color: textSecondary,
                  lineHeight: 1.65,
                  marginBottom: 16,
                  fontWeight: 300,
                  fontFamily: "'DM Sans', var(--font-body), sans-serif",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.excerpt}
              </p>
            )}

            {/* footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "auto",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: textMuted,
                  fontFamily: "'DM Sans', var(--font-body), sans-serif",
                  fontWeight: 300,
                }}
              >
                {formatDate(post.publishedAt)}
              </span>
              <span
                className="read-more-link"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: gold,
                  fontFamily: "'DM Sans', var(--font-body), sans-serif",
                  fontWeight: 400,
                  transition: "letter-spacing 0.3s ease",
                }}
              >
                Read More →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── main component ── */
export default function BlogListingClient({ posts, currentCategory }: Props) {
  const router = useRouter();

  function handleCategoryClick(key: string) {
    if (key === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog?category=${encodeURIComponent(key)}`);
    }
  }

  return (
    <>
      <style>{`
        .post-card {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          height: 100%;
        }
        .post-card-wrapper { height: 100%; }
        .post-card:hover {
          transform: translateY(-6px);
          border-color: rgba(212,175,55,0.3) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.15);
        }
        .post-card:hover .read-more-link {
          letter-spacing: 0.14em;
        }
        .category-tab {
          background: none;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          font-family: 'DM Sans', var(--font-body), sans-serif;
          font-weight: 300;
          font-size: 13px;
          letter-spacing: 0.06em;
          transition: color 0.2s ease;
          white-space: nowrap;
          position: relative;
        }
        .category-tab::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: transparent;
          transition: background 0.2s ease;
        }
        .category-tab.active {
          color: #D4AF37;
        }
        .category-tab.active::after {
          background: #D4AF37;
        }
        .category-tab:not(.active) {
          color: rgba(255,255,255,0.45);
        }
        .category-tab:not(.active):hover {
          color: rgba(255,255,255,0.75);
        }
        @media (max-width: 900px) {
          .posts-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .posts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          background: "#0a0a0c",
          paddingTop: 140,
          paddingBottom: "clamp(60px,8vh,100px)",
        }}
      >
        <div style={container}>
          <FadeUp>
            <p style={eyebrowStyle}>Knowledge &amp; Insights</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              style={{
                fontFamily:
                  "'Cormorant Garamond', var(--font-heading), serif",
                fontWeight: 300,
                fontSize: "clamp(2.6rem,5vw,4rem)",
                color: textPrimary,
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Market{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: gold,
                  fontWeight: 300,
                }}
              >
                Intelligence
              </em>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p
              style={{
                fontSize: "clamp(14px,1.8vw,16px)",
                color: textSecondary,
                fontWeight: 300,
                fontFamily: "'DM Sans', var(--font-body), sans-serif",
                maxWidth: 560,
                lineHeight: 1.7,
                marginBottom: 40,
              }}
            >
              Analysis, perspectives, and guides from 15+ years in Mumbai&apos;s
              luxury markets.
            </p>
          </FadeUp>

          {/* category tabs */}
          <FadeUp delay={0.3}>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                paddingBottom: 0,
                gap: 4,
                scrollbarWidth: "none",
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  className={`category-tab${
                    currentCategory === cat.key ? " active" : ""
                  }`}
                  onClick={() => handleCategoryClick(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section
        style={{
          background: "#111114",
          padding: "clamp(60px,8vh,100px) 0",
        }}
      >
        <div style={container}>
          {posts.length === 0 ? (
            <FadeUp>
              <div
                style={{
                  textAlign: "center",
                  padding: "clamp(60px,10vh,120px) 0",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: "1px solid rgba(212,175,55,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    fontSize: 26,
                  }}
                >
                  ✦
                </div>
                <h3
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', var(--font-heading), serif",
                    fontWeight: 300,
                    fontSize: "clamp(1.4rem,3vw,1.9rem)",
                    color: textPrimary,
                    marginBottom: 14,
                  }}
                >
                  Our insight library is being curated.
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: textSecondary,
                    fontWeight: 300,
                    fontFamily: "'DM Sans', var(--font-body), sans-serif",
                    maxWidth: 420,
                    margin: "0 auto 32px",
                    lineHeight: 1.7,
                  }}
                >
                  Sign up to be notified when we publish our first market
                  intelligence report.
                </p>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-block",
                    background: "transparent",
                    border: `1px solid ${gold}`,
                    color: gold,
                    padding: "12px 28px",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    fontFamily: "'DM Sans', var(--font-body), sans-serif",
                    fontWeight: 400,
                    transition: "background 0.3s ease, color 0.3s ease",
                  }}
                >
                  Notify Me
                </Link>
              </div>
            </FadeUp>
          ) : (
            <div
              className="posts-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
