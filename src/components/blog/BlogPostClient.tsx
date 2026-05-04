"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ── types ── */
interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  author: string | null;
}

interface Props {
  post: Post;
  related: Post[];
}

/* ── design tokens ── */
const gold = "#D4AF37";
const textPrimary = "rgba(255,255,255,0.88)";
const textSecondary = "rgba(255,255,255,0.55)";
const textMuted = "rgba(255,255,255,0.35)";

const containerStyle: React.CSSProperties = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "0 clamp(24px,5vw,80px)",
};

const contentContainerStyle: React.CSSProperties = {
  maxWidth: 760,
  margin: "0 auto",
};

const glassCard: React.CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 12,
  backdropFilter: "blur(20px)",
  overflow: "hidden",
};

/* ── helpers ── */
function getCategoryColor(cat: string | null): string {
  switch (cat) {
    case "Real Estate":
      return "linear-gradient(135deg, #0d1b2e 0%, #1a2a45 60%, #0d1b2e 100%)";
    case "Automobiles":
      return "linear-gradient(135deg, #0d1a25 0%, #1a2d3d 60%, #0d1a25 100%)";
    case "Financial Planning":
      return "linear-gradient(135deg, #0d1f0d 0%, #152e15 60%, #0d1f0d 100%)";
    case "Market Trends":
      return "linear-gradient(135deg, #1a0d2e 0%, #2a1a45 60%, #1a0d2e 100%)";
    default:
      return "linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 60%, #0d0d1a 100%)";
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

function calcReadingTime(content: string | null): number {
  if (!content) return 1;
  return Math.max(1, Math.ceil(content.split(" ").length / 200));
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

/* ── Related card ── */
function RelatedCard({ post, index }: { post: Post; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="related-card-wrapper"
    >
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
        <div className="related-card" style={glassCard}>
          <div
            style={{
              height: 140,
              background: post.coverImage
                ? `url(${post.coverImage}) center/cover no-repeat`
                : getCategoryColor(post.category),
              position: "relative",
            }}
          >
            {post.category && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "rgba(10,10,12,0.75)",
                  borderRadius: 4,
                  padding: "3px 8px",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: getCategoryAccent(post.category),
                  fontFamily: "'DM Sans', var(--font-body), sans-serif",
                }}
              >
                {post.category}
              </div>
            )}
          </div>
          <div style={{ padding: "16px 18px 18px" }}>
            <h4
              style={{
                fontFamily: "'Cormorant Garamond', var(--font-heading), serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: textPrimary,
                lineHeight: 1.3,
                marginBottom: 8,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.title}
            </h4>
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
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Share button ── */
function ShareButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="share-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "9px 18px",
        border: "1px solid rgba(212,175,55,0.25)",
        borderRadius: 6,
        fontSize: 12,
        letterSpacing: "0.06em",
        color: gold,
        textDecoration: "none",
        fontFamily: "'DM Sans', var(--font-body), sans-serif",
        fontWeight: 300,
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
    >
      {icon}
      {label}
    </a>
  );
}

/* ── WhatsApp icon ── */
function WAIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={gold}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={gold}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={gold}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── main component ── */
export default function BlogPostClient({ post, related }: Props) {
  const readingTime = calcReadingTime(post.content);

  function getShareUrls() {
    if (typeof window === "undefined") {
      return { wa: "#", li: "#", x: "#" };
    }
    const url = window.location.href;
    return {
      wa: `https://wa.me/?text=${encodeURIComponent(post.title + " " + url)}`,
      li: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      x: `https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`,
    };
  }

  const shareUrls = getShareUrls();

  return (
    <>
      <style>{`
        .article-content h2 {
          font-family: 'Cormorant Garamond', var(--font-heading), serif;
          font-weight: 300;
          color: rgba(255,255,255,0.88);
          font-size: 1.8rem;
          margin-bottom: 1rem;
          margin-top: 2rem;
          line-height: 1.25;
        }
        .article-content h3 {
          font-family: 'Cormorant Garamond', var(--font-heading), serif;
          font-weight: 300;
          color: rgba(255,255,255,0.82);
          font-size: 1.4rem;
          margin-bottom: 0.8rem;
          margin-top: 1.6rem;
        }
        .article-content p {
          color: rgba(255,255,255,0.6);
          line-height: 1.8;
          margin-bottom: 1.2rem;
          font-weight: 300;
          font-family: 'DM Sans', var(--font-body), sans-serif;
          font-size: 15px;
        }
        .article-content a {
          color: #D4AF37;
          text-decoration: underline;
          text-decoration-color: rgba(212,175,55,0.35);
        }
        .article-content a:hover { text-decoration-color: #D4AF37; }
        .article-content ul, .article-content ol {
          color: rgba(255,255,255,0.6);
          font-weight: 300;
          font-family: 'DM Sans', var(--font-body), sans-serif;
          font-size: 15px;
          line-height: 1.8;
          padding-left: 1.4rem;
          margin-bottom: 1.2rem;
        }
        .article-content li { margin-bottom: 0.4rem; }
        .article-content blockquote {
          border-left: 2px solid rgba(212,175,55,0.4);
          margin: 1.6rem 0;
          padding: 0.8rem 1.2rem;
          color: rgba(255,255,255,0.55);
          font-style: italic;
          font-weight: 300;
        }
        .article-content strong {
          color: rgba(255,255,255,0.82);
          font-weight: 400;
        }
        .share-btn:hover {
          background: rgba(212,175,55,0.08);
          border-color: rgba(212,175,55,0.5);
        }
        .related-card {
          transition: transform 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
        }
        .related-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212,175,55,0.3) !important;
        }
        @media (max-width: 700px) {
          .related-grid { grid-template-columns: 1fr !important; }
          .share-row { flex-wrap: wrap !important; }
        }
      `}</style>

      {/* ── COVER ── */}
      <section
        style={{
          background: post.coverImage ? "#0a0a0c" : "#0a0a0c",
          paddingTop: 80,
        }}
      >
        <div
          style={{
            height: 500,
            position: "relative",
            background: post.coverImage
              ? `url(${post.coverImage}) center/cover no-repeat`
              : getCategoryColor(post.category),
            overflow: "hidden",
          }}
        >
          {/* category watermark */}
          {!post.coverImage && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.05,
                fontSize: "clamp(60px,12vw,120px)",
                fontFamily: "'Cormorant Garamond', var(--font-heading), serif",
                fontWeight: 300,
                color: "#fff",
                textAlign: "center",
                padding: "0 24px",
                lineHeight: 1.1,
              }}
            >
              {post.category || "Aurelion"}
            </div>
          )}
          {/* gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(10,10,12,0.3) 0%, rgba(10,10,12,0.85) 100%)",
            }}
          />
          {/* content overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0 clamp(24px,5vw,80px) 48px",
              maxWidth: 1400,
              margin: "0 auto",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {post.category && (
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(10,10,12,0.6)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${getCategoryAccent(post.category)}40`,
                    borderRadius: 4,
                    padding: "5px 12px",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: getCategoryAccent(post.category),
                    fontFamily: "'DM Sans', var(--font-body), sans-serif",
                    marginBottom: 16,
                  }}
                >
                  {post.category}
                </div>
              )}
              <h1
                style={{
                  fontFamily:
                    "'Cormorant Garamond', var(--font-heading), serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.9rem,4vw,2.8rem)",
                  color: textPrimary,
                  lineHeight: 1.2,
                  marginBottom: 20,
                  maxWidth: 800,
                }}
              >
                {post.title}
              </h1>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {post.author && (
                  <span
                    style={{
                      fontSize: 13,
                      color: textSecondary,
                      fontFamily: "'DM Sans', var(--font-body), sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    By {post.author}
                  </span>
                )}
                {post.publishedAt && (
                  <span
                    style={{
                      fontSize: 13,
                      color: textMuted,
                      fontFamily: "'DM Sans', var(--font-body), sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    {formatDate(post.publishedAt)}
                  </span>
                )}
                <span
                  style={{
                    fontSize: 13,
                    color: textMuted,
                    fontFamily: "'DM Sans', var(--font-body), sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {readingTime} min read
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section
        style={{
          background: "#111114",
          padding: "clamp(48px,7vh,80px) 0",
        }}
      >
        <div style={containerStyle}>
          <div style={contentContainerStyle}>
            <FadeUp>
              {post.content ? (
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "clamp(40px,8vh,80px) 0",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      border: "1px solid rgba(212,175,55,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: 22,
                      color: gold,
                      opacity: 0.6,
                    }}
                  >
                    ✦
                  </div>
                  <p
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', var(--font-heading), serif",
                      fontWeight: 300,
                      fontSize: "1.4rem",
                      color: textSecondary,
                    }}
                  >
                    Content coming soon
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: textMuted,
                      fontWeight: 300,
                      fontFamily: "'DM Sans', var(--font-body), sans-serif",
                      marginTop: 10,
                    }}
                  >
                    Our editorial team is preparing this piece.
                  </p>
                </div>
              )}
            </FadeUp>

            {/* divider */}
            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)",
                margin: "40px 0",
              }}
            />

            {/* ── SHARE ── */}
            <FadeUp delay={0.1}>
              <div>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: textMuted,
                    fontFamily: "'DM Sans', var(--font-body), sans-serif",
                    fontWeight: 400,
                    marginBottom: 16,
                  }}
                >
                  Share this article
                </p>
                <div
                  className="share-row"
                  style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
                >
                  <ShareButton
                    href={shareUrls.wa}
                    label="WhatsApp"
                    icon={<WAIcon />}
                  />
                  <ShareButton
                    href={shareUrls.li}
                    label="LinkedIn"
                    icon={<LinkedInIcon />}
                  />
                  <ShareButton
                    href={shareUrls.x}
                    label="X (Twitter)"
                    icon={<XIcon />}
                  />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── RELATED ARTICLES ── */}
      {related.length > 0 && (
        <section
          style={{
            background: "#0a0a0c",
            padding: "clamp(60px,8vh,100px) 0",
          }}
        >
          <div style={containerStyle}>
            <FadeUp>
              <p
                style={{
                  fontSize: 12,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: gold,
                  fontFamily: "'DM Sans', var(--font-body), sans-serif",
                  fontWeight: 400,
                  marginBottom: 12,
                }}
              >
                Continue Reading
              </p>
              <h2
                style={{
                  fontFamily:
                    "'Cormorant Garamond', var(--font-heading), serif",
                  fontWeight: 300,
                  fontSize: "clamp(1.6rem,3vw,2.2rem)",
                  color: textPrimary,
                  marginBottom: 36,
                }}
              >
                Related Articles
              </h2>
            </FadeUp>
            <div
              className="related-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 22,
              }}
            >
              {related.map((p, i) => (
                <RelatedCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BACK LINK ── */}
      <section
        style={{
          background: "#111114",
          padding: "32px 0",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={containerStyle}>
          <Link
            href="/blog"
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: textMuted,
              textDecoration: "none",
              fontFamily: "'DM Sans', var(--font-body), sans-serif",
              fontWeight: 300,
              transition: "color 0.2s ease",
            }}
          >
            ← Back to all articles
          </Link>
        </div>
      </section>
    </>
  );
}
