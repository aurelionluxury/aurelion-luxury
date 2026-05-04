import type { Metadata } from "next";
import BrokerageContent from "@/components/brokerage/BrokerageContent";

export const metadata: Metadata = {
  title: "Zero-Fee Advisory Model | Aurelion Luxury",
  description:
    "Understand exactly how Aurelion Luxury earns its income — and why that makes our advice completely free and unbiased for you.",
};

export default function BrokeragePage() {
  return <BrokerageContent />;
}
