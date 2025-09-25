import Link from "next/link";
import Image from "next/image";

type Props = {
  id: string;
  title: string;
  city: string;
  country: string;
  price: number;
  imageUrl?: string;
};

export function ListingCard({ id, title, city, country, price, imageUrl }: Props) {
  return (
    <Link href={`/listings/${id}`} className="block group">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={800}
            height={800}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">No image</div>
        )}
      </div>
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate max-w-[70%]" title={title}>{title}</h3>
          <span className="text-sm">${(price / 100).toFixed(0)}/night</span>
        </div>
        <p className="text-sm text-muted-foreground">{city}, {country}</p>
      </div>
    </Link>
  );
}