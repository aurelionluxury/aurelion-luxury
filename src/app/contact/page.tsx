import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Aurelion Luxury | Book a Consultation",
  description:
    "Connect for luxury real estate, automobile, or financial advisory. No fees. No pressure. Book a private consultation today.",
};

export default async function ContactPage() {
  const settings = await prisma.siteSetting.findMany({
    where: {
      key: {
        in: ["phone", "whatsapp", "email", "address", "contact_timing", "contact_branches"],
      },
    },
  }).catch(() => [] as { key: string; value: string }[]);

  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  const phone = map.phone || "+91 84335 51388";
  const whatsapp = map.whatsapp || "918433551388";
  const email = map.email || "aurelionluxury@gmail.com";
  const address = map.address || "Goregaon West, Mumbai";
  const timing = map.contact_timing || "Mon–Sat, 10 AM – 7 PM IST";

  let branches: { city: string; address: string; phone: string; email: string }[] = [];
  if (map.contact_branches) {
    try {
      branches = JSON.parse(map.contact_branches);
    } catch { /* invalid JSON */ }
  }

  return (
    <ContactContent
      phone={phone}
      whatsapp={whatsapp}
      email={email}
      address={address}
      timing={timing}
      branches={branches}
    />
  );
}
