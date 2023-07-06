import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
interface BodyRequest {
  name: string;
  username: string;
  password: string;
  age: number;
}
export async function POST(req: Request) {
  // Parse the JSON body of the request
  const body:BodyRequest = await req.json();
  const { username, name, password, age } = body;

  // Hash the password using bcrypt with a cost factor of 12
  const hashedPass = await bcrypt.hash(password, 12);

  // Create a new user in the Prisma database
  const user = await prisma.user.create({
    data: {
      name,
      username,
      hashedPassword: hashedPass,
      age,
      balance: 0,
    },
  });
  const { hashedPassword, ...result } = user;
  return NextResponse.json(result);
}
