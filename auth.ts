import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials';
import {z} from 'zod';
import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";


async function getUser(license: string){
  console.log("Fetching user with license:", license);
  try {
    const user = await prisma.user.findUnique({where: {license}})
    console.log('found user ',user);
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user");
  }
}

export const {auth, signIn, signOut} = NextAuth({...authConfig, providers: [
Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ license: z.string()})
          .safeParse(credentials);

          if (parsedCredentials.success) {
            const { license} = parsedCredentials.data;
            const user = await getUser(license);
            if (!user) return null;
            return user;
          }
          console.log('Invalid credentials');
          return null;
  
        }
      }),
]});