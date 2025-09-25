import { prismaClient } from "@/lib/prisma";
import { ListingCard } from "@/components/ListingCard";

export default async function Page() {
  const listings = await prismaClient.listing.findMany({
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-5 mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {listings.map((l) => (
          <ListingCard
            key={l.id}
            id={l.id}
            title={l.title}
            city={l.city}
            country={l.country}
            price={l.price}
            imageUrl={l.images[0]?.url}
          />
        ))}
      </div>
    </div>
  );
}
