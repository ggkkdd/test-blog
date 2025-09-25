"use server";

import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function createReservation(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");
  const user = await prismaClient.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("Unauthorized");
  const listingId = String(formData.get("listingId"));
  const startDate = new Date(String(formData.get("startDate")));
  const endDate = new Date(String(formData.get("endDate")));
  const totalPrice = Number(formData.get("totalPrice"));
  await prismaClient.reservation.create({
    data: { listingId, userId: user.id, startDate, endDate, totalPrice },
  });
}