import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function getUserByLicense(license: string) {
  if (!license) return null;
  const user = await prisma.user.findUnique({
    where: { license },
    include: {employer: true, employees: true},
  });
  console.log("getUserByLicense", user);
  if (!user) return null;
  return user;
}

export async function POST(request: NextRequest) {
  try {
    const { license, email } = await request.json();

    if (!license || !email) {
      return NextResponse.json({ error: "License and email are required." }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { license },
      data: { email },
    });

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update email." }, { status: 500 });
  }
}