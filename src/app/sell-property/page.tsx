import type { Metadata } from "next";
import SellPropertyContent from "@/components/sell-property/SellPropertyContent";

export const metadata: Metadata = {
  title: "Sell Your Luxury Property | Aurelion Luxury",
  description:
    "Get the best price for your Mumbai luxury property with access to our 7,000+ HNI buyer network. Zero upfront cost.",
};

export default function SellPropertyPage() {
  return <SellPropertyContent />;
}
