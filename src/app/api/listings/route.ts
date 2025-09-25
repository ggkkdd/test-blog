import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || undefined;
  const country = searchParams.get("country") || undefined;

  const listings = await prisma.listing.findMany({
    where: {
      city: city,
      country: country,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(listings);
}
