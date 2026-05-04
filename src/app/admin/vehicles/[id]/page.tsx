import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import VehicleForm from "@/components/admin/VehicleForm";

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await prisma.vehicle.findUnique({ where: { id: parseInt(id) } });
  if (!vehicle) notFound();
  return <VehicleForm initial={vehicle as unknown as Record<string, unknown>} isEdit />;
}
