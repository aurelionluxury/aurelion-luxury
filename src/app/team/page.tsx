import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import TeamContent from "@/components/team/TeamContent";

export const metadata: Metadata = {
  title: "Our Team | Aurelion Luxury",
  description:
    "Meet the advisors behind Aurelion Luxury — engineering-trained, MBA-qualified, IRDAI-certified experts in luxury real estate, automobiles, and financial advisory.",
};

export default async function TeamPage() {
  const members = await prisma.teamMember
    .findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    })
    .catch(() => []);

  return <TeamContent members={members} />;
}
