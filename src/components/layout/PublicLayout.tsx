"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MarketTicker from "./MarketTicker";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ScrollProgress from "./ScrollProgress";

interface TickerItem { label: string; value: string; }

interface PublicLayoutProps {
  children: React.ReactNode;
  tickerItems: TickerItem[];
  whatsappNumber: string;
}

export default function PublicLayout({ children, tickerItems, whatsappNumber }: PublicLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <ScrollProgress />
      <MarketTicker items={tickerItems} />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton number={whatsappNumber} />
    </>
  );
}
