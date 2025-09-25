import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET() {
	const listings = await prismaClient.listing.findMany({
		include: { images: true, reviews: true },
		orderBy: { createdAt: "desc" },
	});
	return NextResponse.json({ listings });
}

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.email) {
		return new NextResponse("Unauthorized", { status: 401 });
	}
	const body = await req.json();
	const {
		title,
		description,
		price,
		country,
		city,
		address,
		latitude,
		longitude,
		guestCount,
		bedroomCount,
		bedCount,
		bathroomCount,
		imageUrls = [],
		amenities = [],
	} = body;

	const user = await prismaClient.user.findUnique({ where: { email: session.user.email } });
	if (!user) return new NextResponse("Unauthorized", { status: 401 });

	const listing = await prismaClient.listing.create({
		data: {
			title,
			description,
			price,
			country,
			city,
			address,
			latitude,
			longitude,
			guestCount,
			bedroomCount,
			bedCount,
			bathroomCount,
			hostId: user.id,
			images: {
				create: imageUrls.map((url: string, index: number) => ({ url, sortOrder: index })),
			},
			amenities: {
				create: amenities.map((name: string) => ({ amenity: { connectOrCreate: { where: { name }, create: { name } } } })),
			},
		},
	});
	return NextResponse.json({ listing });
}