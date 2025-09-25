import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { listingId, guestName, guestEmail, startDate, endDate } = body;
  if (!listingId || !guestName || !guestEmail || !startDate || !endDate) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const listing = await prisma.listing.findUnique({ where: { id: listingId } });
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000
    )
  );
  const totalPrice = nights * listing.pricePerNight;

  const reservation = await prisma.reservation.create({
    data: {
      listingId,
      guestName,
      guestEmail,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
    },
  });
  return NextResponse.json(reservation, { status: 201 });
}
