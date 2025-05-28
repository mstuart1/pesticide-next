import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { getUserByLicense } from "../../user/update-email/route";

// Extend NextAuth types to include custom properties
declare module "next-auth" {
  interface User extends DefaultUser {
    license?: string;
    role?: string;
    employer?: { name: string } | string | null;
    employees?: any[];
  }
  interface Session {
    user: {
      license: string;
      role: string;
      employer?: string | null;
      employees?: any[];
    } & DefaultSession["user"];
  }
  interface JWT {
    license?: string;
    role?: string;
    employer?: string | null;
    employees?: any[];
  }
}




const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "License",
      credentials: {
        license: { label: "License", type: "text" },
      },
      async authorize(credentials, req) {
        const license = typeof credentials?.license === "string" ? credentials.license : "";
        const user = await getUserByLicense(license);
        if (user) {
          console.log("User found:", user);
          // Return a flat object matching the NextAuth User type
          return {
            id: user.id,
            name: user.name ?? null,
            email: user.email ?? null,
            license: typeof user.license === "string" ? user.license : undefined,
            role: user.role ?? "applicator",
            employer: user.employer
              ? typeof user.employer === "string"
                ? user.employer
                : { name: user.employer.name ?? "" }
              : null,
            employees: user.employees ?? [],
          };
        }
        console.log("No user found for license:", license);
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
          token.employer = typeof user.employer === "object" && user.employer !== null
            ? user.employer.name
            : typeof user.employer === "string"
              ? user.employer
              : '';
          token.employees = user.employees || [];
      }
      return token;
    },
    async session({ session, token }) {
      // Add license and email to the session
      if (session.user) {
        session.user.license = typeof token.license === "string" ? token.license : "";
        session.user.email = token.email;
        session.user.role = typeof token.role === "string" ? token.role : "applicator";
        session.user.employer = typeof token.employer === "string" || token.employer === null || token.employer === undefined
          ? token.employer
          : String(token.employer);
        session.user.employees = Array.isArray(token.employees) ? token.employees : undefined;
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