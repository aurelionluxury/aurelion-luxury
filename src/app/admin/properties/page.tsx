import { prisma } from "@/lib/prisma";
import PropertiesTable from "@/components/admin/PropertiesTable";

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({ orderBy: { createdAt: "desc" } });
  return <PropertiesTable properties={properties as never} />;
}
