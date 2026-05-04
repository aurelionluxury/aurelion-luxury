import type { Metadata } from "next";
import SellCarContent from "@/components/cars/SellCarContent";

export const metadata: Metadata = {
  title: "Sell Your Luxury Car | Aurelion Luxury",
  description:
    "Engineering-grade evaluation and access to 7,000+ HNI buyers. Zero upfront cost — you pay only on successful sale.",
};

export default function SellCarPage() {
  return <SellCarContent />;
}
