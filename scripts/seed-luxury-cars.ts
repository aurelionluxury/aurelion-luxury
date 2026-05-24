import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

function makeSlug(make: string, model: string, year: number) {
  return `${make}-${model}-${year}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const vehicles = [
  // Mercedes-Benz
  { make: "Mercedes-Benz", model: "C-Class", year: 2025, variant: "C 220d AMG Line", type: "Sedan", condition: "new", price: 6000000, priceLabel: "₹55 Lakh – ₹65 Lakh", featured: false, images: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80", description: "The Mercedes-Benz C-Class combines sporty elegance with cutting-edge technology. A perfect entry into the world of Mercedes luxury." },
  { make: "Mercedes-Benz", model: "E-Class", year: 2025, variant: "E 220d LWB", type: "Sedan", condition: "new", price: 9000000, priceLabel: "₹85 Lakh – ₹1.02 Cr", featured: true, images: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80", description: "The new E-Class sets the benchmark for business-class motoring with its MBUX Superscreen and hybrid powertrain options." },
  { make: "Mercedes-Benz", model: "S-Class", year: 2025, variant: "S 450 4MATIC LWB", type: "Sedan", condition: "new", price: 17000000, priceLabel: "₹1.65 Cr – ₹2.5 Cr", featured: true, images: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80", description: "The pinnacle of Mercedes-Benz luxury. The S-Class defines automotive excellence with its massage seats, air suspension and MBUX." },
  { make: "Mercedes-Benz", model: "GLE", year: 2025, variant: "GLE 300d 4MATIC", type: "SUV", condition: "new", price: 10000000, priceLabel: "₹95 Lakh – ₹1.3 Cr", featured: true, images: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80", description: "The GLE is Mercedes-Benz's most popular SUV in India — combining performance, comfort and commanding road presence." },
  { make: "Mercedes-Benz", model: "GLS", year: 2025, variant: "GLS 450 4MATIC", type: "SUV", condition: "new", price: 13500000, priceLabel: "₹1.33 Cr – ₹1.55 Cr", featured: false, images: "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=800&q=80", description: "The GLS — Mercedes-Benz's flagship SUV — offers 7-seat luxury with first-class rear cabin and E-Active Body Control." },

  // BMW
  { make: "BMW", model: "3 Series", year: 2025, variant: "320Ld M Sport", type: "Sedan", condition: "new", price: 5700000, priceLabel: "₹54 Lakh – ₹65 Lakh", featured: false, images: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80", description: "The BMW 3 Series is the quintessential sports sedan — sharp handling, powerful engines and a cockpit designed for the driver." },
  { make: "BMW", model: "5 Series", year: 2025, variant: "530Li M Sport", type: "Sedan", condition: "new", price: 7800000, priceLabel: "₹72 Lakh – ₹95 Lakh", featured: true, images: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=80", description: "The new BMW 5 Series LWB redefines executive travel in India with its extended wheelbase and BMW Curved Display." },
  { make: "BMW", model: "7 Series", year: 2025, variant: "740Li", type: "Sedan", condition: "new", price: 17200000, priceLabel: "₹1.72 Cr – ₹2.5 Cr", featured: true, images: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80", description: "BMW's flagship — the 7 Series — delivers theatre-screen entertainment, Sky Lounge panoramic roof and pure luxury motoring." },
  { make: "BMW", model: "X5", year: 2025, variant: "xDrive40i M Sport", type: "SUV", condition: "new", price: 9500000, priceLabel: "₹95 Lakh – ₹1.2 Cr", featured: true, images: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80", description: "The BMW X5 is India's best-selling luxury SUV — powerful, versatile and unmistakably BMW in every detail." },
  { make: "BMW", model: "X7", year: 2025, variant: "xDrive40i M Sport", type: "SUV", condition: "new", price: 12000000, priceLabel: "₹1.22 Cr – ₹1.55 Cr", featured: false, images: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80", description: "BMW's largest SUV seats 6 in pure luxury. The X7 commands every road with presence, comfort and power." },

  // Volvo
  { make: "Volvo", model: "XC40", year: 2025, variant: "B4 Ultimate Dark", type: "SUV", condition: "new", price: 4800000, priceLabel: "₹48 Lakh – ₹56 Lakh", featured: false, images: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80", description: "The Volvo XC40 is a compact luxury SUV that punches above its weight — safety tech, Harman Kardon audio and Scandinavian design." },
  { make: "Volvo", model: "XC60", year: 2025, variant: "B5 Ultimate", type: "SUV", condition: "new", price: 7000000, priceLabel: "₹68 Lakh – ₹76 Lakh", featured: true, images: "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=800&q=80", description: "India's most awarded Volvo SUV. The XC60 combines class-leading safety, a luxurious interior and a smooth B5 mild-hybrid engine." },
  { make: "Volvo", model: "XC90", year: 2025, variant: "B6 Ultimate 6-Seat", type: "SUV", condition: "new", price: 10000000, priceLabel: "₹1 Cr – ₹1.22 Cr", featured: true, images: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80", description: "The Volvo XC90 — a 7-seater flagship SUV with Captain's Chairs, Bowers & Wilkins audio and Volvo's advanced safety suite." },
  { make: "Volvo", model: "S90", year: 2025, variant: "B6 Ultimate", type: "Sedan", condition: "new", price: 6500000, priceLabel: "₹62 Lakh – ₹72 Lakh", featured: false, images: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&q=80", description: "The Volvo S90 is a refined executive sedan that rivals German luxury with superior comfort and distinctive Scandinavian styling." },

  // Land Rover / JLR
  { make: "Land Rover", model: "Range Rover Evoque", year: 2025, variant: "R-Dynamic SE", type: "SUV", condition: "new", price: 6900000, priceLabel: "₹67 Lakh – ₹75 Lakh", featured: false, images: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", description: "The Range Rover Evoque is the most distinctive compact luxury SUV — award-winning design meets genuine Land Rover capability." },
  { make: "Land Rover", model: "Defender", year: 2025, variant: "Defender 110 X", type: "SUV", condition: "new", price: 11000000, priceLabel: "₹1.03 Cr – ₹1.7 Cr", featured: true, images: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800&q=80", description: "The iconic Defender reimagined. Built for adventure without sacrificing luxury — India's top-selling JLR model in 2025." },
  { make: "Land Rover", model: "Range Rover Sport", year: 2025, variant: "Dynamic SE P400", type: "SUV", condition: "new", price: 15000000, priceLabel: "₹1.3 Cr – ₹2.2 Cr", featured: true, images: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80", description: "The Range Rover Sport combines dynamic performance with Range Rover luxury — the perfect SUV for Mumbai's elite." },
  { make: "Land Rover", model: "Range Rover", year: 2025, variant: "3.0D LWB Autobiography", type: "SUV", condition: "new", price: 24000000, priceLabel: "₹2.4 Cr – ₹4.5 Cr", featured: true, images: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80", description: "The Range Rover is the most coveted luxury SUV in the world. Ultra-luxury motoring at its absolute finest." },

  // BYD
  { make: "BYD", model: "Atto 3", year: 2025, variant: "Extended Range", type: "SUV", condition: "new", price: 3400000, priceLabel: "₹34 Lakh – ₹37 Lakh", featured: false, images: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80", description: "The BYD Atto 3 brings premium electric mobility at an accessible price — Blade Battery, panoramic roof and a tech-forward cabin." },
  { make: "BYD", model: "Seal", year: 2025, variant: "Excellence AWD", type: "Sedan", condition: "new", price: 4100000, priceLabel: "₹41 Lakh – ₹53 Lakh", featured: true, images: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80", description: "The BYD Seal is a premium EV sedan with sports-car performance — 0 to 100 in 3.8 seconds and 700km range." },
  { make: "BYD", model: "Sealion 7", year: 2025, variant: "Excellence AWD", type: "SUV", condition: "new", price: 5000000, priceLabel: "₹50 Lakh – ₹58 Lakh", featured: true, images: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80", description: "BYD's bestseller in India — the Sealion 7 delivers Tesla-rivalling performance in a premium electric SUV package." },

  // Tesla
  { make: "Tesla", model: "Model 3", year: 2025, variant: "Long Range AWD", type: "Sedan", condition: "new", price: 3800000, priceLabel: "₹38 Lakh – ₹42 Lakh", featured: false, images: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80", description: "The Tesla Model 3 — the world's best-selling electric car. Autopilot, 576km range and over-the-air updates." },
  { make: "Tesla", model: "Model Y", year: 2025, variant: "Long Range AWD", type: "SUV", condition: "new", price: 6000000, priceLabel: "₹60 Lakh – ₹68 Lakh", featured: true, images: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80", description: "The Tesla Model Y — India's most anticipated electric SUV. Full Self-Driving capability, 533km range and zero fuel cost." },
  { make: "Tesla", model: "Model S", year: 2025, variant: "Plaid", type: "Sedan", condition: "new", price: 18000000, priceLabel: "₹1.8 Cr – ₹2.1 Cr", featured: false, images: "https://images.unsplash.com/photo-1571127236794-81c6a5f9e6d5?w=800&q=80", description: "The Tesla Model S Plaid — 0 to 100 in under 2 seconds. The fastest production car ever made, with 628km of range." },
];

async function main() {
  console.log("Adding luxury vehicles...");
  let added = 0;
  for (const v of vehicles) {
    const s = makeSlug(v.make, v.model, v.year);
    const existing = await prisma.vehicle.findUnique({ where: { slug: s } });
    if (existing) {
      console.log(`⏭ Skipped (exists): ${v.make} ${v.model}`);
      continue;
    }
    await prisma.vehicle.create({
      data: {
        title: `${v.year} ${v.make} ${v.model} ${v.variant}`,
        slug: s,
        make: v.make,
        model: v.model,
        year: v.year,
        variant: v.variant,
        type: v.type,
        condition: v.condition,
        status: "available",
        price: v.price,
        priceLabel: v.priceLabel,
        featured: v.featured,
        images: v.images,
        description: v.description,
      },
    });
    console.log(`✓ Added: ${v.make} ${v.model}`);
    added++;
  }
  console.log(`\n✅ Done! Added ${added} vehicles.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });