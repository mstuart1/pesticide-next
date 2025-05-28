import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; 
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.license) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { license } = await req.json();

  if (!license) {
    return NextResponse.json({ error: 'License is required' }, { status: 400 });
  }

  
  try {
  console.log("Adding employee with license:", license);
    const user = await prisma.user.update({
      where: { license: session.user.license },
      data: {
        employees: {
          connect: { license: license },
        },
      },
      include: {
        employees: true
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add employee' }, { status: 500 });
  }
}