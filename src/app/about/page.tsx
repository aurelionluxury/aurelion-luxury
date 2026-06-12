import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import AboutContent from "@/components/about/AboutContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Aurelion Luxury | Premium Real Estate Consultants South Mumbai",
  description: "Aurelion Luxury is Mumbai's premier luxury real estate consultancy specialising in ultra-premium properties across South Mumbai. 15+ years in luxury markets, IRDAI certified advisors. Zero advisory fee.",
  alternates: { canonical: "https://www.aurelionluxury.com/about" },
  openGraph: {
    title: "About Aurelion Luxury | Premium Real Estate Consultants",
    description: "Mumbai's premier luxury real estate consultancy. Zero advisory fee. Specialists in South Mumbai's ultra-premium property market.",
    url: "https://www.aurelionluxury.com/about",
  },
};

export default async function AboutPage() {
  const [pageData, teamMembers, founderImageSetting] = await Promise.all([
    prisma.page.findFirst({ where: { slug: "about", isPublished: true } }).catch(() => null),
    prisma.teamMember.findMany({ where: { published: true }, orderBy: { order: "asc" } }).catch(() => []),
    prisma.siteSetting.findUnique({ where: { key: "about_founder_image" } }).catch(() => null),
  ]);
  return (
    <AboutContent
      pageContent={pageData?.content ?? null}
      teamMembers={teamMembers}
      founderImage={founderImageSetting?.value ?? null}
    />
  );
}