import { prismaClient } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createReservation } from "./actions";

export default async function ListingDetail({ params }: { params: { id: string } }) {
  const listing = await prismaClient.listing.findUnique({
    where: { id: params.id },
    include: { images: { orderBy: { sortOrder: "asc" } }, reviews: true, host: true },
  });

  if (!listing) return notFound();

  return (
    <div className="container mx-auto px-5 py-6">
      <h1 className="text-2xl font-semibold">{listing.title}</h1>
      <p className="text-muted-foreground">{listing.city}, {listing.country}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {listing.images.slice(0, 4).map((img) => (
              <div key={img.id} className="relative aspect-square overflow-hidden rounded">
                <Image src={img.url} alt={listing.title} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-medium mb-2">About this place</h2>
            <p className="whitespace-pre-wrap">{listing.description}</p>
          </div>
        </div>
        <div className="border rounded-xl p-4 h-max">
          <div className="flex items-end justify-between mb-4">
            <div className="text-xl">${(listing.price / 100).toFixed(0)} <span className="text-sm text-muted-foreground">night</span></div>
            <div className="text-sm">{listing.guestCount} guests</div>
          </div>
          <form action={createReservation} className="space-y-3">
            <input type="hidden" name="listingId" value={listing.id} />
            <input type="hidden" name="totalPrice" value={listing.price} />
            <input className="w-full border rounded px-3 py-2" name="startDate" type="date" placeholder="Start" required />
            <input className="w-full border rounded px-3 py-2" name="endDate" type="date" placeholder="End" required />
            <button className="w-full bg-black text-white py-2 rounded">Reserve</button>
          </form>
        </div>
      </div>
    </div>
  );
}