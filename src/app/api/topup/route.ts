import getCurrentUser from "@/app/actions/getCurrentuser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  const body = await req.json();
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Invalid CurrentUser" }, { status: 400 });
  }
  const { amount } = body;
  if (!amount || typeof amount !== "number") {
    return NextResponse.json({ message: "Invalid Amount" }, { status: 204 });
  }
  const topup = await prisma.topup.create({
    data: {
      userId: currentUser.id,
      amount,
    },
  });

  // Update saldo pengguna
  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      balance: {
        increment: amount, // Menambahkan saldo
      },
    },
  });
  return NextResponse.json({ topup, user });
}
