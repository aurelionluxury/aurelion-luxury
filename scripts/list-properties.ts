import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

// IDs to DELETE — keeping the better/newer version of each duplicate
const idsToDelete = [
  13,  // 25 Downtown (keeping ID:37 — 25-downtown-mahalaxmi)
  14,  // Lodha Aureus (keeping ID:54 — lodha-aureus-sewri)
  7,   // Oberoi Elysian (keeping ID:24 — oberoi-elysian-goregaon-east)
  16,  // Rustomjee Vista Bay (keeping ID:55 — rustomjee-vista-bay-sewri)
  5,   // Godrej Triology typo (keeping ID:59 — godrej-trilogy-worli)
  12,  // Aaradhya Avaan MICL (keeping ID:66 — micl-aaradhya-avaan-tardeo)
  20,  // The Riviere Worli Skyline (keeping ID:58 — the-riviere-worli)
  15,  // L&T Gateway (keeping ID:56 — the-gateway-lt-sewri)
];

async function main() {
  console.log("🧹 Removing duplicate properties...\n");

  for (const id of idsToDelete) {
    const property = await prisma.property.findUnique({ where: { id } });
    if (property) {
      await prisma.property.delete({ where: { id } });
      console.log(`🗑️  Deleted: ID:${id} | ${property.title} | ${property.slug}`);
    } else {
      console.log(`⚠️  Not found: ID:${id}`);
    }
  }

  const remaining = await prisma.property.count();
  console.log(`\n✅ Cleanup complete! ${remaining} properties remaining in database.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());