import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/lib/prisma";
import { compare } from "bcrypt";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient) as any,
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })]
      : []),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const user = await prismaClient.user.findUnique({ where: { email } });
        if (!user || !user.hashedPassword) return null;
        const ok = await compare(password, user.hashedPassword);
        if (!ok) return null;
        return { id: user.id, name: user.name, email: user.email, image: user.image };
      }
    })
  ],
  pages: {
    signIn: "/auth/signin"
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
};

