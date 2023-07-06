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

export async function DELETE(
  req: Request,
  { params }: { params: { topupId?: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Invalid CurrentUser" }, { status: 400 });
  }
  const { topupId } = params;
  if (!topupId || typeof topupId !== "string") {
    return NextResponse.json({ message: "Invalid Body" }, { status: 204 });
  }

  // Lakukan proses validasi atau otorisasi sesuai kebutuhan
  const topup = await prisma.topup.findUnique({
    where: { id: topupId },
  });

  if (!topup) {
    return NextResponse.json({ error: "Topup not found" }, { status: 404 });
  }

  if (topup.userId !== currentUser.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Hapus data topup berdasarkan ID
  const deletedTopup = await prisma.topup.delete({
    where: { id: topupId },
  });

  return NextResponse.json({ deletedTopup });
}