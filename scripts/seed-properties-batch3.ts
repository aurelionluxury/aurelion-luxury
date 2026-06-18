import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const newProperties = [

  // ── MARINE LINES ──
  {
    title: "Prestige Marine Lines",
    slug: "prestige-marine-lines",
    location: "Marine Lines, South Mumbai",
    developerName: "Prestige Group",
    config: "2 BHK, 3 BHK",
    price: 8.5,
    priceLabel: "Starting ₹8.50 Cr onwards",
    carpetArea: 1200,
    area: "1,200 sq.ft.",
    bedrooms: 2,
    bathrooms: 2,
    type: "apartment",
    status: "under_construction",
    typology: "new_construction",
    possession: "On Request",
    featured: true,
    published: true,
    amenities: "Rooftop Garden, Infinity Pool, Reflexology Track, Gymnasium, Spa, Clubhouse, Arabian Sea Views, 24x7 Security",
    description: "Prestige Marine Lines brings one of India's most trusted developers to one of South Mumbai's most coveted addresses. Offering premium 2 and 3 BHK residences with stunning Arabian Sea views, rooftop garden and infinity pool, this development is designed for buyers who demand the finest of South Mumbai living. Excellent connectivity to Marine Drive, Churchgate and Nariman Point makes this one of the most complete luxury propositions in the Marine Lines micro-market.",
  },
  {
    title: "One Marina",
    slug: "one-marina-marine-lines",
    location: "Sonapur, Marine Lines, South Mumbai",
    developerName: "Sheth Developers",
    config: "3 BHK, 4 BHK",
    price: 18.0,
    priceLabel: "Starting ₹18 Cr onwards",
    carpetArea: 1800,
    area: "1,800 sq.ft. (3 BHK)",
    bedrooms: 3,
    bathrooms: 3,
    type: "apartment",
    status: "under_construction",
    typology: "new_construction",
    possession: "On Request",
    featured: true,
    published: true,
    amenities: "Sea Views, Infinity Pool, Gymnasium, Grand Clubhouse, Spa & Wellness, Concierge Services, Private Lift Lobbies, 24x7 Security",
    description: "One Marina by Sheth Developers perches majestically at Sonapur, Marine Lines — where the soul of South Mumbai meets the sky. Rising 70 storeys above the iconic Arabian Sea, this landmark residential tower redefines what it means to live at the very edge of the ocean. With 3 and 4 BHK residences offering unobstructed sea views, concierge services and world-class amenities, One Marina is among the most anticipated ultra-luxury launches in South Mumbai's recent history.",
  },
  {
    title: "Marine Ocean Towers",
    slug: "marine-ocean-towers-marine-lines",
    location: "Maharshi Karve Road, Marine Lines, South Mumbai",
    developerName: "Marine Drive Hospitality & Realty",
    config: "3 BHK, 4 BHK",
    price: 12.0,
    priceLabel: "Starting ₹12 Cr onwards",
    carpetArea: 1500,
    area: "1,500 sq.ft. (3 BHK)",
    bedrooms: 3,
    bathrooms: 3,
    type: "apartment",
    status: "under_construction",
    typology: "new_construction",
    possession: "On Request",
    featured: false,
    published: true,
    amenities: "Sea Views, Swimming Pool, Gymnasium, Clubhouse, Private Decks, High Ceilings, Vitrified Flooring, 24x7 Security",
    description: "Marine Ocean Towers on Maharshi Karve Road is an architecturally significant residential development designed by Foster + Partners — positioned just 2–3 minutes from Marine Lines and Charni Road stations. Offering premium 3 and 4 BHK residences with private decks, high ceilings and sea views, this project brings world-class design credentials to one of Mumbai's most centrally connected South Mumbai addresses. A rare opportunity to own in a development of genuine international design pedigree.",
  },

  // ── CHARNI ROAD ──
  {
    title: "Prestige Ocean Towers",
    slug: "prestige-ocean-towers-charni-road",
    location: "Charni Road, South Mumbai",
    developerName: "Prestige Group",
    config: "4 BHK, 5 BHK",
    price: 25.0,
    priceLabel: "Starting ₹25 Cr onwards",
    carpetArea: 2500,
    area: "2,500 sq.ft. (4 BHK)",
    bedrooms: 4,
    bathrooms: 4,
    type: "apartment",
    status: "under_construction",
    typology: "new_construction",
    possession: "On Request",
    featured: true,
    published: true,
    amenities: "Panoramic Arabian Sea Views, Infinity Pool, Spa & Wellness, Grand Clubhouse, Concierge Services, Private Lift Lobbies, Low-Density Floor Plans, 24x7 Security",
    description: "Prestige Ocean Towers on Charni Road is one of the most significant luxury launches in South Mumbai's recent history — a 51-storey tower housing just 76 ultra-luxury residences on 2.1 acres of prime sea-facing land. Designed with absolute privacy and maximum sea views in mind, this Prestige Group development offers 4 and 5 BHK homes with panoramic vistas of the Arabian Sea and Queen's Necklace. For buyers who understand that true luxury is measured in rarity, Prestige Ocean Towers is the definitive South Mumbai acquisition of this decade.",
  },

  // ── TARDEO ──
  {
    title: "Lodha Marq",
    slug: "lodha-marq-tardeo",
    location: "Tardeo, South Mumbai",
    developerName: "Lodha Group",
    config: "3 BHK, 4 BHK, 5 BHK",
    price: 22.0,
    priceLabel: "Starting ₹22 Cr onwards",
    carpetArea: 2000,
    area: "2,000 sq.ft. (3 BHK)",
    bedrooms: 3,
    bathrooms: 3,
    type: "apartment",
    status: "under_construction",
    typology: "new_construction",
    possession: "On Request",
    featured: true,
    published: true,
    amenities: "Sea Views from Select Residences, Infinity Pool, Spa & Wellness, Luxurious Clubhouse, Concierge Services, Private Lift Lobbies, Low-Density Tower (80 units), 24x7 Security",
    description: "Lodha Marq in Tardeo is the epitome of ultra-luxury residential living in South Mumbai — a 33-storey landmark tower housing just 80 exclusive 3, 4 and 5 BHK residences on 1.5 acres of prime Tardeo real estate. With select residences offering sea views, stunning city panoramas and the irreplaceable Lodha build quality, this development is positioned for buyers who require the finest South Mumbai address. Strong ROI potential of 10–14% annual appreciation makes this equally compelling as an investment.",
  },
  {
    title: "MICL Aaradhya Avaan",
    slug: "micl-aaradhya-avaan-tardeo",
    location: "Tardeo, South Mumbai",
    developerName: "MICL (Man Infraconstruction)",
    config: "3 BHK, 4 BHK, 5 BHK",
    price: 9.80,
    priceLabel: "Starting ₹9.80 Cr onwards",
    carpetArea: 1450,
    area: "1,450 sq.ft. (3 BHK)",
    bedrooms: 3,
    bathrooms: 3,
    type: "apartment",
    status: "under_construction",
    typology: "new_construction",
    possession: "On Request",
    featured: true,
    published: true,
    amenities: "Arabian Sea Views, Queen's Necklace Views, Marine View, Swimming Pool, Gymnasium, Grand Clubhouse, Concierge Services, 24x7 Security",
    description: "MICL Aaradhya Avaan in Tardeo offers breathtaking 3, 4 and 5 BHK residences with panoramic views of the Arabian Sea, Queen's Necklace and Marine Drive — in the heart of South Mumbai's most prestigious address. Developed by Man Infraconstruction with world-class architecture and a curated lifestyle offering, this project represents an exceptional entry into Tardeo's ultra-premium residential market at a compelling relative price point.",
  },
  {
    title: "SD The Imperial Edge",
    slug: "sd-imperial-edge-tardeo",
    location: "Tardeo, South Mumbai",
    developerName: "SD Corporation",
    config: "3 BHK, 4 BHK",
    price: 15.0,
    priceLabel: "Starting ₹15 Cr onwards",
    carpetArea: 1750,
    area: "1,750 sq.ft. (3 BHK)",
    bedrooms: 3,
    bathrooms: 3,
    type: "apartment",
    status: "under_construction",
    typology: "new_construction",
    possession: "On Request",
    featured: false,
    published: true,
    amenities: "City & Sea Views, Swimming Pool, Spa, Gymnasium, Grand Clubhouse, Landscaped Gardens, Concierge Services, 24x7 Security",
    description: "SD The Imperial Edge by SD Corporation is an exclusive gated community in Tardeo — designed for residents who value privacy, luxury and architectural elegance above all. Overlooking the Willingdon Club and within minutes of Malabar Hill, Nepean Sea Road and Mumbai Central, this development brings together fine craftsmanship, panoramic city views and a serene living environment in the heart of South Mumbai. ROI of 9–13% annual appreciation is expected due to the limited luxury inventory in Tardeo.",
  },
  {
    title: "VDV The Altitude",
    slug: "vdv-the-altitude-tardeo",
    location: "Tardeo, South Mumbai",
    developerName: "VDV Developers",
    config: "2 BHK, 3 BHK",
    price: 3.75,
    priceLabel: "Starting ₹3.75 Cr onwards",
    carpetArea: 900,
    area: "900 sq.ft.",
    bedrooms: 2,
    bathrooms: 2,
    type: "apartment",
    status: "under_construction",
    typology: "new_construction",
    possession: "On Request",
    featured: false,
    published: true,
    amenities: "Swimming Pool, Gymnasium, Clubhouse, Landscaped Gardens, Contemporary Design, 24x7 Security",
    description: "VDV The Altitude offers a compelling entry into the Tardeo residential market — premium 2 and 3 BHK homes with contemporary design and world-class amenities in one of South Mumbai's most sought-after locations. For buyers who aspire to a Tardeo address without the ultra-luxury price point, The Altitude presents a rare opportunity to own in a neighbourhood that consistently appreciates and delivers on lifestyle.",
  },

  // ── GRANT ROAD ──
  {
    title: "Runwal Elegante",
    slug: "runwal-elegante-grant-road",
    location: "Grant Road West, Mumbai",
    developerName: "Runwal Group",
    config: "2 BHK, 3 BHK",
    price: 4.50,
    priceLabel: "Starting ₹4.50 Cr onwards",
    carpetArea: 950,
    area: "950 sq.ft. (2 BHK)",
    bedrooms: 2,
    bathrooms: 2,
    type: "apartment",
    status: "under_construction",
    typology: "new_construction",
    possession: "On Request",
    featured: false,
    published: true,
    amenities: "Swimming Pool, Gymnasium, Clubhouse, Landscaped Gardens, Children's Play Area, 24x7 Security",
    description: "Runwal Elegante at Grant Road West offers well-designed 2 and 3 BHK residences in one of South Mumbai's most centrally located addresses — minutes from Tardeo, Mahalaxmi and Lower Parel. Backed by Runwal Group's trusted development legacy, this project combines quality construction with the rare advantage of a South Mumbai address at a considered price point. Ideal for buyers seeking a strategic entry into the South Mumbai residential market.",
  },
  {
    title: "Lodha Marq — Grant Road Extension",
    slug: "lodha-marq-grant-road",
    location: "Grant Road, Tardeo Area, South Mumbai",
    developerName: "Lodha Group",
    config: "3 BHK, 4 BHK",
    price: 18.0,
    priceLabel: "Starting ₹18 Cr onwards",
    carpetArea: 1800,
    area: "1,800 sq.ft. (3 BHK)",
    bedrooms: 3,
    bathrooms: 3,
    type: "apartment",
    status: "under_construction",
    typology: "new_construction",
    possession: "On Request",
    featured: false,
    published: true,
    amenities: "Sea Views, Swimming Pool, Gymnasium, Grand Clubhouse, Concierge Services, Private Lift Lobbies, 24x7 Security",
    description: "Located near Bhatia Hospital Lane at the Grant Road–Tardeo confluence, this Lodha development occupies a prime South Mumbai location with excellent access to Altamount Road, Peddar Road and the Coastal Road. Offering spacious 3 and 4 BHK residences with the Lodha standard of finish and amenities, this project is positioned for HNI buyers and NRIs seeking a credible developer in one of South Mumbai's most strategically positioned micro-markets.",
  },
];

async function main() {
  console.log("🏠 Seeding Batch 3 — Marine Lines, Charni Road, Tardeo, Grant Road...\n");

  let added = 0;
  let skipped = 0;

  for (const property of newProperties) {
    const existing = await prisma.property.findUnique({ where: { slug: property.slug } });
    if (existing) {
      console.log(`⏭️  Skipped (already exists): ${property.title}`);
      skipped++;
      continue;
    }
    await prisma.property.create({ data: property });
    console.log(`✅ Added: ${property.title} — ${property.location} [${property.status}]`);
    added++;
  }

  console.log(`\n🎉 Done! ${added} added, ${skipped} skipped.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
