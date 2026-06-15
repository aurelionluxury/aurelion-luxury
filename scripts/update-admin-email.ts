import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  const admin = await prisma.admin.updateMany({
    where: { email: "admin@aurelionluxury.com" },
    data: { email: "aurelionluxury@gmail.com" },
  });
  console.log(`✅ Updated ${admin.count} admin email to aurelionluxury@gmail.com`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());