import getCurrentUser from "@/app/actions/getCurrentuser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  const body = await req.json();
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Invalid CurrentUser" }, { status: 400 });
  }
  const { amount, receiverId } = body;
  if (
    !amount ||
    typeof amount !== "number" ||
    !receiverId ||
    typeof receiverId !== "string"
  ) {
    return NextResponse.json({ message: "Invalid Body" }, { status: 204 });
  }

  // Lakukan pembagian saldo dengan menyimpan data ke dalam database
  const shareBalance = await prisma.shareBalance.create({
    data: {
      amount,
      receiverId,
      senderId: currentUser.id,
    },
  });

  // Update saldo pengirim (pengurangan saldo)
  const updateSenderBalance = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      balance: {
        decrement: amount, // Mengurangi saldo pengirim
      },
    },
  });

  // Update saldo penerima (penambahan saldo)
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