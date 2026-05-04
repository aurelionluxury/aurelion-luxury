import prisma from "@/lib/prisma";
import HeroSection from "@/components/home/HeroSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import BrandStory from "@/components/home/BrandStory";
import ServicesBento from "@/components/home/ServicesBento";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default async function HomePage() {
  const [featuredProperties, featuredVehicles, testimonials, settings] = await Promise.all([
    prisma.property.findMany({
      where: { featured: true, published: true },
      select: { id: true, title: true, slug: true, location: true, area: true, type: true, bedrooms: true, priceLabel: true, images: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    }).catch(() => [] as { id: number; title: string; slug: string; location: string; area: string | null; type: string; bedrooms: number | null; priceLabel: string | null; images: string | null }[]),
    prisma.vehicle.findMany({
      where: { featured: true },
      select: { id: true, title: true, slug: true, year: true, variant: true, condition: true, priceLabel: true, images: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    }).catch(() => [] as { id: number; title: string; slug: string; year: number; variant: string | null; condition: string; priceLabel: string | null; images: string | null }[]),
    prisma.testimonial.findMany({
      where: { isActive: true },
      select: { id: true, content: true, designation: true, company: true, rating: true, category: true },
      take: 10,
      orderBy: { createdAt: "desc" },
    }).catch(() => [] as { id: number; content: string; designation: string | null; company: string | null; rating: number; category: string | null }[]),
    prisma.siteSetting.findMany({
      where: { key: { startsWith: "home_" } },
    }).catch(() => [] as { key: string; value: string }[]),
  ]);

  const s: Record<string, string> = {};
  for (const row of settings) s[row.key] = row.value;

  return (
    <>
      <HeroSection
        eyebrow={s.home_hero_eyebrow}
        headline={s.home_hero_headline}
        subtitle={s.home_hero_subtitle}
        btn1Text={s.home_hero_btn1_text}
        btn1Link={s.home_hero_btn1_link}
        btn2Text={s.home_hero_btn2_text}
        btn2Link={s.home_hero_btn2_link}
      />
      <FeaturedListings dbProperties={featuredProperties} dbVehicles={featuredVehicles} />
      <BrandStory
        name={s.home_expert_name}
        title={s.home_expert_title}
        initial={s.home_expert_initial}
        desc1={s.home_expert_desc1}
        desc2={s.home_expert_desc2}
        credentials={s.home_expert_credentials}
      />
      <ServicesBento />
      <Testimonials dbTestimonials={testimonials} />
      <CTASection
        eyebrow={s.home_cta_eyebrow}
        headline={s.home_cta_headline}
        subtitle={s.home_cta_subtitle}
        btn1Text={s.home_cta_btn1_text}
        btn1Link={s.home_cta_btn1_link}
        btn2Text={s.home_cta_btn2_text}
        btn2Link={s.home_cta_btn2_link}
      />
    </>
  );
}
