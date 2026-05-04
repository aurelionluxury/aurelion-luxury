import { prisma } from "@/lib/prisma";
import VehiclesTable from "@/components/admin/VehiclesTable";

export default async function VehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
  return <VehiclesTable vehicles={vehicles as unknown as Record<string, unknown>[]} />;
}
