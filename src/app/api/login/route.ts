import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
interface BodyRequest {
  username: string;
  password: string;
}
export async function POST(req: Request) {
  const body: BodyRequest = await req.json();
  const user = await prisma.user.findUnique({
    where: { username: body.username },
  });
  if (user && (await bcrypt.compare(body.password, user.hashedPassword))) {
    const { hashedPassword, ...userWithoutPass } = user;
    return NextResponse.json(JSON.stringify(userWithoutPass));
  } else {
    return NextResponse.json(JSON.stringify(null));
  }
}
