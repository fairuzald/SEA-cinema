import getCurrentUser from "@/app/actions/getCurrentuser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  const body = await req.json();
  const currentUser = await getCurrentUser();

  // Check if the current user is valid
  if (!currentUser) {
    return NextResponse.json(
      { message: "Invalid CurrentUser" },
      { status: 400 }
    );
  }

  const { amount } = body;

  // Validate the amount value
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ message: "Invalid Amount" }, { status: 204 });
  }

  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
  });

  // Check if the user exists
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Check if the user has sufficient balance for withdrawal
  if (user.balance < amount) {
    return NextResponse.json(
      { message: "Insufficient Balance" },
      { status: 503 }
    );
  }

  const withdrawal = await prisma.withdrawal.create({
    data: {
      userId: currentUser.id,
      amount,
    },
  });

  // Reduce the user's balance
  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      balance: {
        decrement: amount, // Reduce the balance
      },
    },
  });

  return NextResponse.json({ withdrawal, updatedUser });
}
