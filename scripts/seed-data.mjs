import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  // ── TASK 1: Sample Properties ────────────────────────────────────
  const properties = [
    {
      title: "Lodha Malabar",
      slug: "lodha-malabar",
      location: "Malabar Hill, South Mumbai",
      area: "Malabar Hill",
      type: "Apartment",
      bedrooms: 4,
      carpetArea: 2800,
      priceLabel: "Starting ₹18 Cr",
      price: 180000000,
      developerName: "Lodha",
      status: "under_construction",
      possession: "Dec 2027",
      featured: true,
      description: "Luxury 4 BHK residences by Lodha at the prestigious Malabar Hill, South Mumbai.",
    },
    {
      title: "Oberoi Three Sixty West",
      slug: "oberoi-three-sixty-west",
      location: "Worli",
      area: "Worli",
      type: "Apartment",
      bedrooms: 3,
      carpetArea: 2100,
      priceLabel: "Starting ₹12 Cr",
      price: 120000000,
      developerName: "Oberoi Realty",
      status: "ready_to_move",
      possession: "Immediate",
      featured: true,
      description: "Premium 3 BHK residences by Oberoi Realty in Worli with sea views.",
    },
    {
      title: "Godrej Platinum",
      slug: "godrej-platinum",
      location: "Vikhroli",
      area: "Vikhroli",
      type: "Apartment",
      bedrooms: 3,
      carpetArea: 1650,
      priceLabel: "Starting ₹4.5 Cr",
      price: 45000000,
      developerName: "Godrej Properties",
      status: "ready_to_move",
      featured: true,
      description: "Ready-to-move 3 BHK apartments by Godrej Properties in Vikhroli.",
    },
    {
      title: "Rustomjee Crown",
      slug: "rustomjee-crown",
      location: "Prabhadevi",
      area: "Prabhadevi",
      type: "Apartment",
      bedrooms: 4,
      carpetArea: 2400,
      priceLabel: "Starting ₹15 Cr",
      price: 150000000,
      developerName: "Rustomjee",
      status: "new_launch",
      featured: false,
      description: "New launch luxury 4 BHK residences by Rustomjee in Prabhadevi.",
    },
    {
      title: "Birla Niyaara",
      slug: "birla-niyaara",
      location: "Worli",
      area: "Worli",
      type: "Apartment",
      bedrooms: 3,
      carpetArea: 1800,
      priceLabel: "Starting ₹8 Cr",
      price: 80000000,
      developerName: "Birla Estates",
      status: "under_construction",
      possession: "2026",
      featured: false,
      description: "Luxury 3 BHK residences by Birla Estates in Worli.",
    },
  ];

  for (const p of properties) {
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
    console.log(`✓ Property: ${p.title}`);
  }

  // ── TASK 2: Micro Market PSF Rates ───────────────────────────────
  const markets = [
    { name: "Malabar Hill", slug: "malabar-hill", zone: "South Mumbai", priceRange: "₹80,000 - ₹1,80,000/sq ft", appreciation: "8-12% YoY", description: "Mumbai's most prestigious residential address with spectacular sea views and heritage bungalows." },
    { name: "Worli", slug: "worli", zone: "South Mumbai", priceRange: "₹60,000 - ₹1,20,000/sq ft", appreciation: "10-15% YoY", description: "Prime sea-facing neighbourhood with luxury high-rises and excellent connectivity to BKC." },
    { name: "Bandra West", slug: "bandra-west", zone: "Western Suburbs", priceRange: "₹55,000 - ₹90,000/sq ft", appreciation: "8-10% YoY", description: "Mumbai's most cosmopolitan neighbourhood, home to celebrities and top professionals." },
    { name: "Juhu", slug: "juhu", zone: "Western Suburbs", priceRange: "₹50,000 - ₹85,000/sq ft", appreciation: "7-9% YoY", description: "Iconic beachside locale popular with Bollywood, media, and business communities." },
    { name: "Lower Parel", slug: "lower-parel", zone: "Central Mumbai", priceRange: "₹45,000 - ₹75,000/sq ft", appreciation: "9-12% YoY", description: "Mumbai's thriving mill district transformed into a luxury commercial and residential hub." },
    { name: "BKC", slug: "bkc", zone: "Central Mumbai", priceRange: "₹50,000 - ₹80,000/sq ft", appreciation: "10-14% YoY", description: "Mumbai's premier business district with top-tier corporate offices and luxury residences." },
    { name: "Prabhadevi", slug: "prabhadevi", zone: "Central Mumbai", priceRange: "₹50,000 - ₹80,000/sq ft", appreciation: "8-11% YoY", description: "Upscale neighbourhood between Worli and Dadar with luxury residences and excellent amenities." },
    { name: "Andheri West", slug: "andheri-west", zone: "Western Suburbs", priceRange: "₹25,000 - ₹45,000/sq ft", appreciation: "6-8% YoY", description: "Vibrant western suburb with excellent connectivity, popular with young professionals." },
    { name: "Goregaon", slug: "goregaon", zone: "Western Suburbs", priceRange: "₹18,000 - ₹30,000/sq ft", appreciation: "7-10% YoY", description: "Rapidly developing suburb with film studios, IT parks and emerging luxury projects." },
    { name: "Borivali", slug: "borivali", zone: "Western Suburbs", priceRange: "₹15,000 - ₹25,000/sq ft", appreciation: "6-8% YoY", description: "Self-sufficient suburb with the National Park, popular with families seeking quality living." },
  ];

  for (const m of markets) {
    await prisma.microMarket.upsert({
      where: { slug: m.slug },
      update: { priceRange: m.priceRange, appreciation: m.appreciation, description: m.description },
      create: m,
    });
    console.log(`✓ MicroMarket: ${m.name}`);
  }

  // ── TASK 3: Sample Vehicles ───────────────────────────────────────
  const vehicles = [
    {
      title: "Mercedes-Benz S 500 4MATIC",
      slug: "mercedes-benz-s-500-4matic",
      make: "Mercedes-Benz",
      model: "S-Class",
      variant: "S 500 4MATIC",
      year: 2024,
      type: "Sedan",
      condition: "Pre-Owned",
      status: "available",
      price: 18500000,
      priceLabel: "₹1.85 Cr",
      mileage: 15000,
      fuel: "Petrol",
      transmission: "Automatic",
      featured: true,
      description: "Flagship luxury sedan with advanced driver assistance and premium cabin.",
    },
    {
      title: "BMW X5 xDrive30d M Sport",
      slug: "bmw-x5-xdrive30d-m-sport",
      make: "BMW",
      model: "X5",
      variant: "xDrive30d M Sport",
      year: 2023,
      type: "SUV",
      condition: "Pre-Owned",
      status: "available",
      price: 9200000,
      priceLabel: "₹92 Lakhs",
      mileage: 22000,
      fuel: "Diesel",
      transmission: "Automatic",
      featured: true,
      description: "Performance SUV with M Sport package, panoramic roof and Harman Kardon sound.",
    },
    {
      title: "Porsche Cayenne Coupe",
      slug: "porsche-cayenne-coupe",
      make: "Porsche",
      model: "Cayenne",
      variant: "Cayenne Coupé",
      year: 2024,
      type: "SUV",
      condition: "Pre-Owned",
      status: "available",
      price: 16500000,
      priceLabel: "₹1.65 Cr",
      mileage: 8000,
      fuel: "Petrol",
      transmission: "Automatic",
      featured: true,
      description: "Sports SUV with coupe roofline, sport chrono package and PASM suspension.",
    },
    {
      title: "Audi Q7 Technology 55 TFSI",
      slug: "audi-q7-technology-55-tfsi",
      make: "Audi",
      model: "Q7",
      variant: "Technology 55 TFSI",
      year: 2023,
      type: "SUV",
      condition: "Pre-Owned",
      status: "available",
      price: 8800000,
      priceLabel: "₹88 Lakhs",
      mileage: 18000,
      fuel: "Petrol",
      transmission: "Automatic",
      featured: false,
      description: "7-seater luxury SUV with Matrix LED headlights and Bang & Olufsen audio.",
    },
    {
      title: "Range Rover Velar R-Dynamic",
      slug: "range-rover-velar-r-dynamic",
      make: "Land Rover",
      model: "Range Rover Velar",
      variant: "R-Dynamic",
      year: 2024,
      type: "SUV",
      condition: "Pre-Owned",
      status: "available",
      price: 9500000,
      priceLabel: "₹95 Lakhs",
      mileage: 12000,
      fuel: "Diesel",
      transmission: "Automatic",
      featured: false,
      description: "Sleek luxury SUV with Touch Pro Duo infotainment and air suspension.",
    },
  ];

  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { slug: v.slug },
      update: v,
      create: v,
    });
    console.log(`✓ Vehicle: ${v.title}`);
  }

  console.log("\n✅ All seed data inserted successfully.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
