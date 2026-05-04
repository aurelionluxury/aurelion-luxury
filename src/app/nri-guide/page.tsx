import type { Metadata } from "next";
import NRIGuideContent from "@/components/nri-guide/NRIGuideContent";

export const metadata: Metadata = {
  title: "NRI Buying Guide — Invest in Mumbai | Aurelion Luxury",
  description:
    "Everything non-resident Indians need to know about buying property in Mumbai — RERA, documentation, taxes, and how we help from anywhere in the world.",
};

export default function NRIGuidePage() {
  return <NRIGuideContent />;
}
