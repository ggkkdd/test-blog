import { ListingCard } from "@/components/ListingCard";
import { prisma } from "@/lib/prisma";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const city = (searchParams.city as string) || undefined;
  const country = (searchParams.country as string) || undefined;
  const listings = await prisma.listing.findMany({
    where: {
      city: city,
      country: country,
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="container mx-auto px-5 mb-10">
      <div className="flex items-center justify-between py-6">
        <h1 className="text-2xl font-semibold">Find your next stay</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
};

export default Page;
