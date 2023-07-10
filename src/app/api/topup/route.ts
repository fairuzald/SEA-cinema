import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentuser";

// Define the POST handler for the API
export async function POST(req: Request) {
  const body = await req.json();
  const currentUser = await getCurrentUser();

  // Check if the current user is valid
  if (!currentUser) {
    return NextResponse.json(
      { message: "Invalid Current User" },
      { status: 400 }
    );
  }

  const { amount } = body;

  // Validate the amount value
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ message: "Invalid Amount" }, { status: 204 });
  }

  // Create a new top-up transaction in the database
  const topup = await prisma.topup.create({
    data: {
      userId: currentUser.id,
      amount,
    },
  });

  // Update the user's balance by incrementing the amount
  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      balance: {
        increment: amount,
      },
    },
  });

  // Return the top-up transaction and updated user data
  return NextResponse.json({ topup, user });
}
