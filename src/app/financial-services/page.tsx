import type { Metadata } from "next";
import FinancialServicesContent from "@/components/financial-services/FinancialServicesContent";

export const metadata: Metadata = {
  title: "Home Loans, Car Loans & Insurance | Aurelion Luxury",
  description:
    "IRDAI-certified insurance advisory and loan negotiation with 8+ banking partners. Zero cost to you — lenders pay our referral.",
};

export default function FinancialServicesPage() {
  return <FinancialServicesContent />;
}
