import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentuser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Invalid CurrentUser" }, { status: 400 });
  }

  const { movieTitle, locationId, watchDate, watchTime, totalPrice, seats } =
    body;

  let bookingNumber = generateUniqueBookingNumber();

  // Generate unique booking number manually
  async function generateUniqueBookingNumber() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = Math.floor(Math.random() * 3) + 6; // Random length between 6 and 8
    let bookingNumber = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      bookingNumber += characters[randomIndex];
    }

    // Check if booking number already exists in the database
    const existingTransaction = await prisma.transaction.findUnique({
      where: { bookingNumber },
    });

    if (existingTransaction) {
      // Booking number already exists, generate a new one recursively
      return generateUniqueBookingNumber();
    }

    return bookingNumber;
  }

  // Update user balance
  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      balance: {
        decrement: totalPrice,
      },
    },
  });

  // Save transaction data to the database
  const transaction = await prisma.transaction.create({
    data: {
      bookingNumber: (await bookingNumber).toString(),
      userId: currentUser.id,
      movieTitle,
      locationId,
      watchDate,
      watchTime,
      totalPrice,
      seat: seats,
      status: "Success",
      createdAt: new Date().toISOString(),
    },
  });

  return NextResponse.json({ transaction, updatedUser });
}
