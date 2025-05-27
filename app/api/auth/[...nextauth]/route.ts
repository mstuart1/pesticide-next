import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma"; // <-- Import your Prisma client

async function getUserByLicense(license: string) {
  // Use Prisma to find the user by license
  if (!license) return null;
  const user = await prisma.user.findUnique({
    where: { license },
  });
  if (!user) return null;
  // Return only the fields you want in the session
  return {
    id: user.id,
    name: user.name,
    license: user.license,
    // add more fields if needed
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

export { handler as GET, handler as POST };