import getCurrentUser from "@/app/actions/getCurrentuser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  const body = await req.json();
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { message: "Invalid CurrentUser" },
      { status: 400 }
    );
  }
  const { amount, receiverId } = body;
  // Validating body and check type of data body
  if (
    !amount ||
    typeof amount !== "number" ||
    !receiverId ||
    typeof receiverId !== "string" ||
    amount <= 0
  ) {
    return NextResponse.json({ message: "Invalid Body" }, { status: 204 });
  }

  // Validate not to send balance to yourself
  if (receiverId === currentUser.id) {
    return NextResponse.json(
      { message: "Unable to send balance to yourself" },
      { status: 404 }
    );
  }

  // Fetch user's balance now
  const sender = await prisma.user.findUnique({
    where: { id: currentUser.id },
  });

  if (!sender) {
    return NextResponse.json({ message: "Sender not found" }, { status: 404 });
  }

  // Validating balance not gonna be minus if success
  if (sender.balance < amount) {
    return NextResponse.json(
      { message: "Insufficient balance" },
      { status: 400 }
    );
  }

  // Share balance and save data into database
  const shareBalance = await prisma.shareBalance.create({
    data: {
      amount,
      receiverId,
      senderId: currentUser.id,
    },
  });

  // Update the sender's balance (deducting the amount)
  const updateSenderBalance = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      balance: {
        decrement: amount,
      },
    },
  });

  // Update the receiver's balance (adding the amount)
  const updateReceiverBalance = await prisma.user.update({
    where: { id: receiverId },
    data: {
      balance: {
        increment: amount, // Menambahkan saldo penerima
      },
    },
  });

  return NextResponse.json({
    shareBalance,
    updateReceiverBalance,
    updateSenderBalance,
  });
}
