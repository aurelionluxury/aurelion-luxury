import type { Metadata } from "next";
import FinancialServicesContent from "@/components/financial-services/FinancialServicesContent";

export const metadata: Metadata = {
  title: "Home Loans & Financial Services Mumbai | IRDAI Certified Advisors",
  description: "Expert home loan assistance with 8+ banking partners and IRDAI-certified insurance advisory for luxury property buyers in Mumbai. Zero cost to clients — lenders pay our referral fee.",
  keywords: ["home loan luxury property mumbai", "irdai certified insurance mumbai", "property finance consultant mumbai", "home loan 8 banks mumbai"],
  alternates: { canonical: "https://www.aurelionluxury.com/financial-services" },
  openGraph: {
    title: "Home Loans & Financial Services Mumbai | Aurelion Luxury",
    description: "IRDAI-certified financial services for luxury property buyers. 8+ banking partners. Zero cost to clients.",
    url: "https://www.aurelionluxury.com/financial-services",
  },
};

export default function FinancialServicesPage() {
  return <FinancialServicesContent />;
}