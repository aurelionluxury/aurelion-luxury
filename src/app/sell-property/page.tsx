import type { Metadata } from "next";
import SellPropertyContent from "@/components/sell-property/SellPropertyContent";

export const metadata: Metadata = {
  title: "Sell Your Luxury Property Mumbai | Access 7,000+ HNI Buyers",
  description: "Get the best price for your luxury flat, penthouse, or bungalow in South Mumbai. Aurelion Luxury connects premium sellers with 7,000+ qualified HNI and NRI buyers. Zero upfront cost. Zero brokerage for sellers.",
  keywords: ["sell luxury flat mumbai", "sell penthouse south mumbai", "luxury property sellers agent mumbai", "hni buyers mumbai property"],
  alternates: { canonical: "https://www.aurelionluxury.com/sell-property" },
  openGraph: {
    title: "Sell Your Luxury Property Mumbai | Aurelion Luxury",
    description: "Connect with 7,000+ qualified HNI and NRI buyers. Zero upfront cost. Zero brokerage for sellers.",
    url: "https://www.aurelionluxury.com/sell-property",
  },
};

export default function SellPropertyPage() {
  return <SellPropertyContent />;
}