import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import PublicLayout from "@/components/layout/PublicLayout";
import prisma from "@/lib/prisma";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// ── UPDATED: metadata now focused on luxury real estate South Mumbai ──
export const metadata: Metadata = {
  metadataBase: new URL("https://www.aurelionluxury.com"),
  title: {
    default:
      "Luxury Real Estate South Mumbai | Sea-Facing Flats, Penthouses & Villas | Aurelion Luxury",
    template: "%s | Aurelion Luxury",
  },
  description:
    "Discover South Mumbai's finest luxury properties with Aurelion Luxury. We specialise in ultra-premium sea-facing apartments, penthouses, and bungalows in Worli, Pedder Road, Bandra, and Cuffe Parade. Zero advisory fee.",
  keywords: [
    "luxury real estate south mumbai",
    "luxury flats south mumbai",
    "sea facing apartments mumbai",
    "luxury property consultant mumbai",
    "south mumbai penthouse",
    "buy luxury apartment mumbai",
    "worli sea face apartment",
    "pedder road property",
    "cuffe parade flat",
    "malabar hill bungalow",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.aurelionluxury.com",
    siteName: "Aurelion Luxury",
    title: "Luxury Real Estate South Mumbai | Aurelion Luxury",
    description:
      "Discover South Mumbai's finest luxury properties — sea-facing apartments, penthouses, and bungalows in Worli, Pedder Road, and Cuffe Parade. Zero advisory fee.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Aurelion Luxury – Premium Real Estate South Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Real Estate South Mumbai | Aurelion Luxury",
    description: "Discover South Mumbai's finest luxury properties.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ── NEW: schema tells Google and AI exactly who you are ──
const schemaOrg = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  name: "Aurelion Luxury",
  description:
    "Premium luxury real estate consultants specialising in ultra-high-end sea-facing apartments, penthouses, bungalows, and villas in South Mumbai — Worli, Pedder Road, Bandra, Cuffe Parade, and Malabar Hill.",
  url: "https://www.aurelionluxury.com",
  telephone: "+91-8433551388",      // ← replace with your real number
  email: "aurelionluxury@gmail.com", // ← replace with your real email
  address: {
    "@type": "PostalAddress",
    streetAddress: "112/895 Motilal Nagar No.1, Goregaon (west)", // ← replace
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400104",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.1625,
    longitude: 72.8497,
  },
  areaServed: [
    { "@type": "City", name: "Mumbai" },
    { "@type": "Neighborhood", name: "South Mumbai" },
    { "@type": "Neighborhood", name: "Worli" },
    { "@type": "Neighborhood", name: "Pedder Road" },
    { "@type": "Neighborhood", name: "Cuffe Parade" },
    { "@type": "Neighborhood", name: "Bandra West" },
    { "@type": "Neighborhood", name: "Malabar Hill" },
    { "@type": "Neighborhood", name: "Altamount Road" },
  ],
   image: "https://www.aurelionluxury.com/logo.jpg",
  priceRange: "₹₹₹₹",
  openingHours: "Mo-Sa 09:00-19:00",
  sameAs: [
    "https://www.instagram.com/aurelionluxury",
    "https://www.linkedin.com/company/aurelionluxury",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [tickerItems, siteSettings] = await Promise.all([
    prisma.marketTicker
      .findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
        select: { label: true, value: true },
      })
      .catch(() => [] as { label: string; value: string }[]),
    prisma.siteSetting
      .findMany({
        where: { key: { in: ["whatsapp", "phone", "email"] } },
      })
      .catch(() => [] as { key: string; value: string }[]),
  ]);

  const settingsMap = Object.fromEntries(
    siteSettings.map((s) => [s.key, s.value])
  );
  const whatsappNumber = settingsMap.whatsapp || "918433551388";

  return (
    <html lang="en" suppressHydrationWarning={true}>
      {/* ── NEW: schema injected into <head> for Google + AI search ── */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <PublicLayout tickerItems={tickerItems} whatsappNumber={whatsappNumber}>
          {children}
        </PublicLayout>
      </body>
    </html>
  );
}