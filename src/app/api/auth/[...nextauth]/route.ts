import NextAuth from "next-auth";
import { prisma } from "@/core/libs/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { notificationInfo } from "@/core/helpers";
// import { notificationInfo } from "@/core/helpers";

const handler = NextAuth({
  providers: [
    // Se expone un Formulario para Login, página de error y funcionalidad para cerrar sesión
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "german@german.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = await res.json();

        if (user.error) {
          throw new Error(user.message);
        }
        return user;
      },
    }),
    GoogleProvider({
      // For Local
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // For Repository Remote or Github
      // clientId: "",
      // clientSecret: "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // agregar userId al token para login con google
      if (token.sub) {
        const user = await prisma.user.findUnique({
          where: { email: token.email ?? undefined },
        });
        token = { ...token, userId: user?.id };
      }

      session.user = token as any;

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes("/")) return `${baseUrl}/operations`;

      return baseUrl;
    },
    async signIn({ account, profile }) {
      if (account && account.provider === "google") {
        if (!profile?.email) {
          throw new Error("No profile");
        }

        await prisma.user.upsert({
          where: { email: profile.email },
          create: {
            email: profile.email,
            name: profile.name,
            password: await bcrypt.hash(
              Math.random().toString(36).slice(-8),
              bcrypt.genSaltSync(10)
            ),
          },
          update: {
            name: profile.name,
          },
        });
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
});

export { handler as GET, handler as POST };
