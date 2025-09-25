import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.reservation.deleteMany();
  await prisma.listing.deleteMany();

  await prisma.listing.createMany({
    data: [
      {
        title: "Sunny Loft in Downtown",
        description: "A bright loft near cafes and museums.",
        imageUrl: "/images/placeholder.webp",
        pricePerNight: 120,
        numBedrooms: 1,
        numBeds: 1,
        numBathrooms: 1,
        maxGuests: 2,
        city: "Lisbon",
        country: "Portugal",
        amenities: { wifi: true, kitchen: true, ac: true },
      } as any,
      {
        title: "Cozy Cabin Retreat",
        description: "Secluded cabin with mountain views.",
        imageUrl: "/images/placeholder.webp",
        pricePerNight: 180,
        numBedrooms: 2,
        numBeds: 3,
        numBathrooms: 1,
        maxGuests: 4,
        city: "Asheville",
        country: "USA",
        amenities: { wifi: true, fireplace: true, parking: true },
      } as any,
      {
        title: "Beachfront Apartment",
        description: "Steps from the sand with ocean views.",
        imageUrl: "/images/placeholder.webp",
        pricePerNight: 240,
        numBedrooms: 2,
        numBeds: 2,
        numBathrooms: 2,
        maxGuests: 4,
        city: "Nice",
        country: "France",
        amenities: { wifi: true, balcony: true, washer: true },
      } as any,
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

