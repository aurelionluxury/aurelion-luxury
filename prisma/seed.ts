import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import path from "path";
import { pathToFileURL } from "url";

const dbPath = path.join(process.cwd(), "dev.db");
const dbUrl = pathToFileURL(dbPath).href;
const adapter = new PrismaLibSql({ url: dbUrl });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  console.log("Seeding database...");

  // Admin user
  const hashed = await bcrypt.hash("admin123", 12);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@aurelionluxury.com" },
    update: {},
    create: {
      email: "admin@aurelionluxury.com",
      password: hashed,
      name: "Swapnil",
      role: "admin",
    },
  });
  console.log(`✓ Admin: ${admin.email}`);

  // Site settings
  const settings = [
    { key: "whatsapp_number", value: "919XXXXXXXXX" },
    { key: "phone", value: "+91 9XXXXXXXXX" },
    { key: "email", value: "hello@aurelionluxury.com" },
    { key: "irdai_number", value: "XXXXXXXX" },
    { key: "instagram", value: "https://instagram.com/aurelionluxury" },
    { key: "linkedin", value: "https://linkedin.com/company/aurelionluxury" },
    { key: "youtube", value: "https://youtube.com/@aurelionluxury" },
    { key: "address", value: "Mumbai, Maharashtra, India" },
    { key: "calendly_url", value: "https://calendly.com/aurelionluxury" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log(`✓ ${settings.length} site settings`);

  // Market ticker items
  const tickers = [
    { label: "Mumbai Property Index", value: "+8.5% YoY", trend: "up", category: "real_estate", order: 1 },
    { label: "Luxury Sales", value: "63% of Total Market", trend: "up", category: "real_estate", order: 2 },
    { label: "Pre-Owned Luxury Cars", value: "16% CAGR", trend: "up", category: "automobiles", order: 3 },
    { label: "Term Insurance ₹10Cr Cover", value: "From ₹81K/yr", trend: "neutral", category: "financial", order: 4 },
    { label: "Bandra-BKC Corridor", value: "3.6% CAGR", trend: "up", category: "real_estate", order: 5 },
    { label: "South Mumbai Inventory", value: "Lowest in 5 Years", trend: "neutral", category: "real_estate", order: 6 },
    { label: "Luxury Car Segment", value: "42% Growth YoY", trend: "up", category: "automobiles", order: 7 },
  ];

  // Clear existing tickers then insert
  await prisma.marketTicker.deleteMany();
  for (const t of tickers) {
    await prisma.marketTicker.create({ data: t });
  }
  console.log(`✓ ${tickers.length} market ticker items`);

  // Sample FAQs
  const faqs = [
    { question: "Is your advisory service really free?", answer: "Yes — our advisory is completely free for buyers and borrowers. We earn through developer and dealer commissions, which means our interests are aligned with yours.", category: "general", order: 1 },
    { question: "Do you charge any hidden fees?", answer: "No hidden fees, ever. Our zero-fee model is the foundation of Aurelion Luxury. We believe transparent advisory builds long-term relationships.", category: "general", order: 2 },
    { question: "What areas in Mumbai do you cover for real estate?", answer: "We cover the entire Mumbai Metropolitan Region — from Churchgate in the south to Borivali in the north, including Bandra, Juhu, Worli, BKC, Powai, and Thane.", category: "real_estate", order: 1 },
    { question: "Do you deal in only new construction or resale too?", answer: "We currently focus on new construction projects from reputed developers. We are selective — every project we represent has been vetted for legality, quality, and value.", category: "real_estate", order: 2 },
    { question: "What types of luxury cars do you deal in?", answer: "We handle all premium and luxury brands — Mercedes-Benz, BMW, Audi, Porsche, Land Rover, Volvo, and more. Both new and certified pre-owned vehicles.", category: "automobiles", order: 1 },
    { question: "Are you IRDAI certified?", answer: "Yes — our founder Swapnil is an IRDAI Certified Insurance Advisor. All insurance recommendations comply with IRDAI regulations.", category: "financial", order: 1 },
    { question: "Can you help with both home loan and insurance for the same property?", answer: "Absolutely. This is one of our key advantages — we handle real estate, financing, and insurance as a single seamless advisory. You save time and get coordinated advice.", category: "financial", order: 2 },
  ];

  await prisma.fAQ.deleteMany();
  for (const f of faqs) {
    await prisma.fAQ.create({ data: { ...f, isActive: true } });
  }
  console.log(`✓ ${faqs.length} FAQs`);

  // Sample testimonials
  const testimonials = [
    { name: "Senior Executive", designation: "Financial Services", company: "South Mumbai", content: "The zero-cost advisory model was refreshing. Finally, someone who puts the client's interest first.", rating: 5, category: "real_estate", isActive: true },
    { name: "Business Owner", designation: "Entrepreneur", company: "Bandra West", content: "Professional, knowledgeable, and incredibly responsive. The technical evaluation of the car gave me complete confidence.", rating: 5, category: "automobiles", isActive: true },
    { name: "Director", designation: "IT Services", company: "Powai", content: "Handling property purchase and insurance under one advisor saved me weeks of coordination.", rating: 5, category: "financial", isActive: true },
  ];

  await prisma.testimonial.deleteMany();
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`✓ ${testimonials.length} testimonials`);

  console.log("\n✅ Database seeded successfully.");
  console.log("Admin login: admin@aurelionluxury.com / admin123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
