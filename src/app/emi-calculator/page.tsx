import type { Metadata } from "next";
import EMICalculatorContent from "@/components/financial-services/EMICalculatorContent";

export const metadata: Metadata = {
  title: "EMI Calculator — Home & Car Loans | Aurelion Luxury",
  description:
    "Calculate your monthly EMI for home or car loans. Real-time calculation with adjustable loan amount, rate, and tenure.",
};

export default function EMICalculatorPage() {
  return <EMICalculatorContent />;
}
