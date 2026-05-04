import type { Metadata } from "next";
import ConciergeContent from "@/components/cars/ConciergeContent";

export const metadata: Metadata = {
  title: "Ownership Concierge | Aurelion Luxury",
  description:
    "Expert coordination for luxury vehicle care — ceramic coating, accessories, service management, and documentation.",
};

export default function ConciergePage() {
  return <ConciergeContent />;
}
