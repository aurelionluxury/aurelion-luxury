import type { Metadata } from "next";
import NRIGuideContent from "@/components/nri-guide/NRIGuideContent";

export const metadata: Metadata = {
  title: "NRI Property Buying Guide Mumbai | FEMA Rules, Home Loans & Process",
  description: "Complete guide for NRIs buying luxury property in Mumbai. Covers FEMA regulations, NRE and NRO accounts, home loan eligibility, and property registration process. Expert NRI property consultants.",
  keywords: ["nri property buying mumbai", "nri home loan india", "fema property rules nri", "nri luxury apartment mumbai", "nro account property india"],
  alternates: { canonical: "https://www.aurelionluxury.com/nri-guide" },
  openGraph: {
    title: "NRI Property Buying Guide Mumbai | Aurelion Luxury",
    description: "FEMA rules, NRE/NRO accounts, home loans, and registration process for NRIs buying property in Mumbai.",
    url: "https://www.aurelionluxury.com/nri-guide",
  },
};

export default function NRIGuidePage() {
  return <NRIGuideContent />;
}