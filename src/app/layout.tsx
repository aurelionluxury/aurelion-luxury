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

export const metadata: Metadata = {
  title: {
    default: "Aurelion Luxury — Mumbai's Premium Concierge Brokerage",
    template: "%s | Aurelion Luxury",
  },
  description:
    "Mumbai's premier luxury concierge brokerage. Curated real estate, exotic automobiles, and IRDAI-certified financial services. Zero cost to clients.",
  keywords: [
    "luxury real estate Mumbai",
    "luxury cars Mumbai",
    "home loans Mumbai",
    "IRDAI certified insurance Mumbai",
    "luxury brokerage India",
    "Aurelion Luxury",
  ],
  openGraph: {
    title: "Aurelion Luxury — Mumbai's Premium Concierge Brokerage",
    description:
      "Curated real estate, exotic automobiles, and IRDAI-certified financial services in Mumbai. Zero brokerage for clients.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [tickerItems, siteSettings] = await Promise.all([
    prisma.marketTicker.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      select: { label: true, value: true },
    }).catch(() => [] as { label: string; value: string }[]),
    prisma.siteSetting.findMany({
      where: { key: { in: ["whatsapp", "phone", "email"] } },
    }).catch(() => [] as { key: string; value: string }[]),
  ]);

  const settingsMap = Object.fromEntries(siteSettings.map((s) => [s.key, s.value]));
  const whatsappNumber = settingsMap.whatsapp || "919XXXXXXXXX";

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`} suppressHydrationWarning={true}>
        <PublicLayout tickerItems={tickerItems} whatsappNumber={whatsappNumber}>
          {children}
        </PublicLayout>
      </body>
    </html>
  );
}
