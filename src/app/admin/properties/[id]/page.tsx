import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await prisma.property.findUnique({ where: { id: parseInt(id) } });
  if (!property) notFound();
  return <PropertyForm initial={property as unknown as Record<string, unknown>} isEdit />;
}
