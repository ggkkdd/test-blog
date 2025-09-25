import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({ where: { id: params.id } });
  if (!listing) return notFound();
  return (
    <div className="container mx-auto px-5 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={listing.imageUrl} alt={listing.title} className="w-full rounded-lg" />
          <h1 className="text-2xl font-semibold mt-4">{listing.title}</h1>
          <p className="text-muted-foreground mt-2">{listing.city}, {listing.country}</p>
          <p className="mt-4">{listing.description}</p>
          <div className="mt-4 text-sm text-muted-foreground">
            Sleeps {listing.maxGuests} • {listing.numBedrooms} bedrooms • {listing.numBathrooms} baths
          </div>
        </div>
        <form
          className="border rounded-lg p-4 h-fit sticky top-6"
          action={async (formData: FormData) => {
            "use server";
            const startDate = formData.get("startDate") as string;
            const endDate = formData.get("endDate") as string;
            const guestName = formData.get("guestName") as string;
            const guestEmail = formData.get("guestEmail") as string;
            const nights = Math.max(
              1,
              Math.ceil(
                (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000
              )
            );
            const totalPrice = nights * listing.pricePerNight;
            await prisma.reservation.create({
              data: {
                listingId: listing.id,
                guestName,
                guestEmail,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                totalPrice,
              },
            });
          }}
        >
          <div className="text-xl font-medium mb-2">${listing.pricePerNight} night</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm">Check-in</label>
              <input name="startDate" type="date" className="border rounded px-3 py-2" required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm">Check-out</label>
              <input name="endDate" type="date" className="border rounded px-3 py-2" required />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm">Name</label>
            <input name="guestName" type="text" className="border rounded px-3 py-2" required />
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <label className="text-sm">Email</label>
            <input name="guestEmail" type="email" className="border rounded px-3 py-2" required />
          </div>
          <button type="submit" className="mt-4 w-full bg-primary text-primary-foreground rounded px-4 py-2">
            Reserve
          </button>
          <p className="text-xs text-muted-foreground mt-2">No payment collected in this demo.</p>
        </form>
      </div>
    </div>
  );
}

