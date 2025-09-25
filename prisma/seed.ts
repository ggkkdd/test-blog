import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@staybnb.dev";
  const password = await hash("password123", 10);
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Demo User",
      hashedPassword: password,
    },
  });

  const listingsData = [
    {
      title: "Cozy Studio near Central Park",
      description: "A bright studio close to the park and subway.",
      price: 12000,
      country: "USA",
      city: "New York",
      address: "123 Park Ave",
      hostId: user.id,
      images: { create: [{ url: "https://picsum.photos/seed/studio/800/800", sortOrder: 0 }] },
    },
    {
      title: "Beachfront Apartment",
      description: "Enjoy ocean views and sunsets from the balcony.",
      price: 18000,
      country: "Spain",
      city: "Barcelona",
      address: "456 Beach Rd",
      hostId: user.id,
      images: { create: [{ url: "https://picsum.photos/seed/beach/800/800", sortOrder: 0 }] },
    },
    {
      title: "Alpine Cabin Retreat",
      description: "Quiet cabin with fireplace and mountain views.",
      price: 15000,
      country: "Switzerland",
      city: "Zermatt",
      address: "789 Mountain St",
      hostId: user.id,
      images: { create: [{ url: "https://picsum.photos/seed/cabin/800/800", sortOrder: 0 }] },
    },
  ];

  for (const data of listingsData) {
    await prisma.listing.create({ data } as any);
  }
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