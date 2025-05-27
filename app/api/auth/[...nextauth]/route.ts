import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

async function getUserByLicense(license: string) {
  if (!license) return null;
  const user = await prisma.user.findUnique({
    where: { license },
  });
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    license: user.license,
  };
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "License",
      credentials: {
        license: { label: "License", type: "text" },
      },
      async authorize(credentials) {
        const license = typeof credentials?.license === "string" ? credentials.license : "";
        const user = await getUserByLicense(license);
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

// Wrap the handler for App Router compatibility
export const GET = async (req: Request, ctx: any) => handler(req, ctx);
export const POST = async (req: Request, ctx: any) => handler(req, ctx);