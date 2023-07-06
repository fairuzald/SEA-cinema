import { v4 as uuidv4 } from "uuid";
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

  // Generate unique booking number
  async function generateUniqueBookingNumber() {
    const newBookingNumber = uuidv4();

    // Check if booking number already exists in the database
    const existingTransaction = await prisma.transaction.findUnique({
      where: { bookingNumber: newBookingNumber },
    });

    if (existingTransaction) {
      // Booking number already exists, generate a new one recursively
      return generateUniqueBookingNumber();
    }

    return newBookingNumber;
  }

  // Perform validation or authorization process as needed

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
      status: "success",
    },
  });

  return NextResponse.json({ transaction });
}
