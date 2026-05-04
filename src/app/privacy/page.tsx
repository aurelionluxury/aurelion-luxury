import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Privacy Policy | Aurelion Luxury",
  description:
    "How Aurelion Luxury collects, uses, and protects your personal information.",
};

const gold = "#D4AF37";
const textPrimary = "rgba(255,255,255,0.88)";
const textSecondary = "rgba(255,255,255,0.55)";
const textMuted = "rgba(255,255,255,0.35)";

const sections = [
  {
    title: "1. What We Collect",
    body: `We collect information you provide directly to us when you make an enquiry, schedule a consultation, or correspond with us. This includes:

    • Your name and contact details (phone number, email address, postal address)
    • Property preferences, budget ranges, and requirement specifications shared during advisory conversations
    • Financial information you choose to share voluntarily to help us tailor our recommendations (such as income range, existing assets, or loan eligibility)
    • Usage data collected automatically when you visit our website, including your IP address, browser type, pages visited, and time spent on each page

    We collect only the information that is necessary to deliver our services or to improve your experience on our platform.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `Your information is used for the following purposes:

    • To provide and personalise our advisory services to you
    • To respond to your enquiries, requests, and correspondence
    • To connect you with relevant developers, dealers, lenders, or insurers as part of your transaction
    • To send you market updates, new project launches, and relevant opportunities — but only with your explicit consent
    • To comply with legal and regulatory obligations, including those under IRDAI guidelines

    We do not use your data for automated decision-making or profiling. Every engagement is handled personally by our team.`,
  },
  {
    title: "3. Data Storage & Security",
    body: `Your personal information is stored securely on encrypted servers located within India, in compliance with applicable data protection norms under the Information Technology Act and its rules.

    We implement industry-standard security measures including encryption in transit and at rest, access controls, and regular security reviews. Only authorised personnel have access to personal data, and only to the extent necessary for service delivery.

    We retain your data for as long as your relationship with us is active and for a reasonable period thereafter (up to 7 years) for legal and regulatory compliance. You may request earlier deletion — see Section 5.`,
  },
  {
    title: "4. Sharing Your Information",
    body: `We do not sell, rent, or trade your personal information to any third party.

    Your data may be shared with the following parties, strictly for the purpose of facilitating your transaction:

    • Developers and project sales teams — when you express interest in a property
    • Automobile dealers — when you engage us for vehicle advisory
    • Banks and non-banking financial companies — when you request loan or insurance advisory
    • Lawyers and chartered accountants empanelled by us — when documentation or tax advisory is required

    Any sharing is done only with your knowledge and consent, and only to the extent necessary to advance your stated transaction. Third parties we share data with are required to maintain the same standard of confidentiality.`,
  },
  {
    title: "5. Your Rights",
    body: `You have the following rights with respect to your personal data held by Aurelion Luxury:

    • Access: You may request a copy of the personal information we hold about you.
    • Correction: If any information is inaccurate or outdated, you may request that we correct it.
    • Deletion: You may request that we delete your personal data. We will comply unless we are required to retain it by law or for legitimate business purposes (such as an ongoing transaction).
    • Withdrawal of Consent: You may withdraw consent for marketing communications at any time by contacting us.

    To exercise any of these rights, please contact us at data@aurelionluxury.com. We will respond within 30 days.`,
  },
  {
    title: "6. Cookies",
    body: `Our website uses basic analytics cookies to understand how visitors navigate our site. These cookies collect aggregate, anonymised data — they do not identify you personally.

    We use:
    • Session cookies: Temporary cookies that expire when you close your browser, used for smooth navigation.
    • Analytics cookies: Persistent cookies (up to 12 months) from a privacy-compliant analytics provider, tracking page visits and referral sources.

    You may disable cookies through your browser settings at any time. Disabling cookies will not affect your ability to use our website, though some features may behave differently.

    We do not use advertising cookies, tracking pixels, or any third-party cookies for targeted advertising.`,
  },
  {
    title: "7. Contact",
    body: `For any questions, requests, or concerns regarding this Privacy Policy or your personal data, please contact us at:

    Email: data@aurelionluxury.com

    We take all privacy concerns seriously and commit to responding within 30 days of receiving your communication. If you are not satisfied with our response, you may raise a grievance with the relevant regulatory authority.

    This Privacy Policy was last updated in March 2026. We may update it periodically to reflect changes in our practices or applicable law. Continued use of our services after any update constitutes acceptance of the revised policy.`,
  },
];

export default async function PrivacyPage() {
  const pageData = await prisma.page
    .findFirst({ where: { slug: "privacy-policy", isPublished: true } })
    .catch(() => null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* HERO */}
      <section
        style={{
          background: "#0a0a0c",
          paddingTop: 140,
          paddingBottom: "clamp(60px,8vh,100px)",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 clamp(24px,5vw,80px)",
          }}
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
            Legal
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
              lineHeight: 1.2,
              color: textPrimary,
              margin: "0 0 20px",
            }}
          >
            Privacy{" "}
            <em style={{ fontStyle: "italic", color: gold }}>Policy</em>
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: 14,
              color: textMuted,
              margin: 0,
            }}
          >
            Last updated: March 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section
        style={{
          background: "#0a0a0c",
          paddingBottom: "clamp(80px,12vh,140px)",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 clamp(24px,5vw,80px)",
          }}
        >
          {/* intro */}
          <div
            style={{
              maxWidth: 780,
              marginBottom: 56,
              padding: "28px 32px",
              border: "1px solid rgba(212,175,55,0.15)",
              borderLeft: `3px solid ${gold}`,
              background:
                "linear-gradient(145deg, rgba(212,175,55,0.04), transparent)",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 14,
                color: textSecondary,
                lineHeight: 1.85,
                margin: 0,
              }}
            >
              At Aurelion Luxury, we handle your personal information with the
              same care and discretion we apply to every aspect of our advisory
              practice. This policy explains what we collect, why we collect it,
              how it is stored, and the choices you have over your data.
            </p>
          </div>

          {/* sections */}
          {pageData?.content ? (
            <div
              dangerouslySetInnerHTML={{ __html: pageData.content }}
              style={{
                maxWidth: 780,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 14,
                color: textSecondary,
                lineHeight: 1.85,
              }}
            />
          ) : (
          <div style={{ maxWidth: 780, display: "flex", flexDirection: "column", gap: 48 }}>
            {sections.map((sec, i) => (
              <div key={i}>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "1.5rem",
                    color: textPrimary,
                    margin: "0 0 16px",
                  }}
                >
                  {sec.title}
                </h2>
                <div
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(to right, rgba(212,175,55,0.2), transparent)",
                    marginBottom: 20,
                  }}
                />
                {sec.body.split("\n").map((line, j) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;
                  if (trimmed.startsWith("•")) {
                    return (
                      <p
                        key={j}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 300,
                          fontSize: 14,
                          color: textSecondary,
                          lineHeight: 1.8,
                          margin: "0 0 8px",
                          paddingLeft: 20,
                          position: "relative",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: gold,
                          }}
                        >
                          —
                        </span>
                        {trimmed.slice(1).trim()}
                      </p>
                    );
                  }
                  return (
                    <p
                      key={j}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: 14,
                        color: textSecondary,
                        lineHeight: 1.85,
                        margin: "0 0 16px",
                      }}
                    >
                      {trimmed}
                    </p>
                  );
                })}
              </div>
            ))}
          </div>
          )}
        </div>
      </section>
    </>
  );
}
