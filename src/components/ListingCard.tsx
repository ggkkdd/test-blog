import Link from "next/link";

type Listing = {
  id: string;
  title: string;
  city: string;
  country: string;
  imageUrl: string;
  pricePerNight: number;
};

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="block rounded-lg overflow-hidden border hover:shadow-md transition-shadow"
    >
      <div className="aspect-[4/3] bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <p className="font-medium truncate mr-2">{listing.title}</p>
          <p className="text-sm">${listing.pricePerNight}/night</p>
        </div>
        <p className="text-sm text-muted-foreground">
          {listing.city}, {listing.country}
        </p>
      </div>
    </Link>
  );
}

