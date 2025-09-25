import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });
  const user = await prismaClient.user.findUnique({ where: { email: session.user.email } });
  if (!user) return new NextResponse("Unauthorized", { status: 401 });
  const reservations = await prismaClient.reservation.findMany({
    where: { userId: user.id },
    include: { listing: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ reservations });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });
  const user = await prismaClient.user.findUnique({ where: { email: session.user.email } });
  if (!user) return new NextResponse("Unauthorized", { status: 401 });
  const { listingId, startDate, endDate, totalPrice } = await req.json();
  const reservation = await prismaClient.reservation.create({
    data: {
      listingId,
      userId: user.id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
    },
  });
  return NextResponse.json({ reservation });
}