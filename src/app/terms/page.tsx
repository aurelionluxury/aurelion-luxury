import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Terms of Service | Aurelion Luxury",
  description:
    "The terms and conditions governing your use of Aurelion Luxury advisory services.",
};

const gold = "#D4AF37";
const textPrimary = "rgba(255,255,255,0.88)";
const textSecondary = "rgba(255,255,255,0.55)";
const textMuted = "rgba(255,255,255,0.35)";

const sections = [
  {
    title: "1. Service Scope",
    body: `Aurelion Luxury provides advisory and facilitation services in the areas of luxury real estate, pre-owned and new automobiles, home and vehicle loans, and insurance products. Our services are advisory in nature.

    Nothing communicated by Aurelion Luxury — whether in person, by phone, by email, through our website, or through any other channel — constitutes legal advice, financial advice, investment advice, tax advice, or any other professional advice regulated under Indian law.

    While our team holds relevant qualifications including an MBA and IRDAI certification, our role is to assist you in making informed decisions, not to make decisions on your behalf or to replace the advice of a qualified lawyer, chartered accountant, or registered investment advisor.

    Clients are encouraged to independently verify all information provided and to seek professional counsel appropriate to their specific situation before committing to any transaction.`,
  },
  {
    title: "2. Information Accuracy",
    body: `Property specifications, pricing, floor plans, availability, possession dates, and all related details are sourced directly from developers, dealers, or other principals at the time of communication. These details are subject to change without notice.

    Aurelion Luxury makes every reasonable effort to provide accurate and current information. However, we cannot guarantee the completeness, accuracy, or timeliness of any information shared, and we accept no liability for errors or omissions in third-party data.

    Automobile specifications, pricing, and features are sourced from manufacturer and dealer materials and are subject to the terms and conditions of the relevant dealership.

    Loan interest rates, eligibility criteria, and processing fees shared during our advisory are indicative only and are subject to final sanction by the lending institution.`,
  },
  {
    title: "3. No Guarantees",
    body: `Real estate is a long-term asset class subject to market forces, economic conditions, regulatory changes, and other factors beyond our control. Aurelion Luxury does not guarantee any specific returns, appreciation, rental yields, or investment outcomes on any property or asset recommended or facilitated by us.

    Past performance or appreciation of any property, market, or asset class referenced in our advisory is not indicative of future results.

    Insurance products are subject to the terms and conditions of the insurer. Policy terms, premiums, and coverage are governed exclusively by the insurer's policy document. Please read all policy documents carefully before purchasing.

    By engaging our services, you acknowledge that you understand the nature and risks associated with the assets you are considering, and that you are making an independent and informed decision.`,
  },
  {
    title: "4. Limitation of Liability",
    body: `To the maximum extent permitted by applicable law, Aurelion Luxury's total liability arising out of or in connection with any engagement — whether in contract, tort, or otherwise — shall be limited to the total fees actually paid by you to Aurelion Luxury in connection with the specific matter giving rise to the claim.

    Aurelion Luxury shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, loss of data, or loss of opportunity, even if we have been advised of the possibility of such damages.

    We shall not be liable for the acts or omissions of third parties, including developers, dealers, banks, insurers, or legal professionals, even where we have made introductions or referrals to such parties.

    Nothing in these terms limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under Indian law.`,
  },
  {
    title: "5. Governing Law & Jurisdiction",
    body: `These Terms of Service are governed by and construed in accordance with the laws of India.

    Any dispute, controversy, or claim arising out of or relating to these terms, or the breach, termination, or invalidity thereof, shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra, India.

    You agree that any legal proceedings arising from your use of our services shall be conducted exclusively before the courts of Mumbai, irrespective of where you are domiciled or where any transaction was initiated or concluded.`,
  },
  {
    title: "6. Amendments",
    body: `Aurelion Luxury reserves the right to update, modify, or replace these Terms of Service at any time. When we make material changes, we will update the "last revised" date at the top of this page.

    Your continued use of our website or services following the posting of any changes constitutes acceptance of those changes. If you do not agree to the revised terms, you should cease using our services.

    It is your responsibility to review these terms periodically. We recommend checking this page when you return after a period of absence.

    These terms supersede all prior agreements, representations, and understandings between you and Aurelion Luxury relating to the subject matter herein.`,
  },
  {
    title: "7. Contact",
    body: `For any queries regarding these Terms of Service, please contact us:

    Email: legal@aurelionluxury.com

    We aim to respond to all legal queries within 10 business days. For urgent matters, please include the word "URGENT" in your email subject line.

    Aurelion Luxury
    Mumbai, Maharashtra, India`,
  },
];

export default async function TermsPage() {
  const pageData = await prisma.page
    .findFirst({ where: { slug: "terms", isPublished: true } })
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
            Terms of{" "}
            <em style={{ fontStyle: "italic", color: gold }}>Service</em>
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
              Please read these Terms of Service carefully before using the
              Aurelion Luxury website or engaging our advisory services. By
              accessing our platform or requesting our services, you agree to be
              bound by the terms set out below. If you do not agree, please
              refrain from using our services.
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
          <div
            style={{
              maxWidth: 780,
              display: "flex",
              flexDirection: "column",
              gap: 48,
            }}
          >
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

          {/* closing note */}
          <div
            style={{
              maxWidth: 780,
              marginTop: 56,
              padding: "24px 28px",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 8,
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: textMuted,
                lineHeight: 1.8,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              These terms constitute the entire agreement between you and
              Aurelion Luxury with respect to the use of our services. If any
              provision is found to be unenforceable, the remaining provisions
              shall continue in full force and effect.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
