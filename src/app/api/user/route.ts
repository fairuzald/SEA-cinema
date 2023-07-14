import getCurrentUser from "@/app/actions/getCurrentuser";
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
  const body: BodyRequest = await req.json();
  const { username, name, password, age } = body;
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof age !== "number" ||
    typeof name !== "string"
  ) {
    return NextResponse.json({ status: 204, message: "Invalid type data" });
  }

  // Find already exist user
  const prevUser = await prisma.user.findUnique({
    where: { username: username },
  });

  // if the username is already exist send message to popup on toast
  if (prevUser) {
    return NextResponse.json({
      message: "The user already exist, You can log in again",
      status: 409,
    });
  }

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
  return NextResponse.json({
    message: "Successfully created user",
    status: 200,
  });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Invalid Current User" },
      { status: 400 }
    );
  }

  const { name, username, telephone, age } = body;

  // Update user data
  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      name,
      username,
      telephoneNumber: telephone,
      age,
    },
  });

  return NextResponse.json({ updatedUser });
}
