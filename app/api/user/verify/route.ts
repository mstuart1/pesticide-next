import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.license) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.update({
      where: { license: session.user.license },
      data: { updatedAt: new Date() },
    });
    return NextResponse.json({ ok: true, user });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update verification date." }, { status: 500 });
  }
}