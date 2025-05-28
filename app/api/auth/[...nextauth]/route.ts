import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

console.log("NEXTAUTH_SECRET", process.env.NEXTAUTH_SECRET);

async function getUserByLicense(license: string) {
  if (!license) return null;
  const user = await prisma.user.findUnique({
    where: { license },
    include: {employer: true},
  });
  console.log("getUserByLicense", user);
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    license: user.license,
    email: user.email,
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
  callbacks: {
    async jwt({ token, user }) {
      // Add license and email to the token at login
      if (user) {
        token.license = user.license;
        token.email = user.email || '';
          token.role = user.role || "applicator"; // Default to 'user' role if not set
          token.employer = user.employer?.name || '';
      }
      return token;
    },
    async session({ session, token }) {
      // Add license and email to the session
      if (session.user) {
        session.user.license = token.license;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.employer = token.employer;
      }
      return session;
    },
  },
  cookies: {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: false,
    },
  },
},
});

// Wrap the handler for App Router compatibility
export const GET = async (req: Request, ctx: any) => handler(req, ctx);
export const POST = async (req: Request, ctx: any) => handler(req, ctx);