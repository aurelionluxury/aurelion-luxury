import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Aurelion Luxury | Mumbai's Premier Advisory",
  description: "Meet the team behind Aurelion Luxury — 15+ years in luxury markets, engineering background, IRDAI certified advisors.",
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
