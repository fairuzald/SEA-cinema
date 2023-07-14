import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentuser";

export async function DELETE(
  req: Request,
  { params }: { params: { id?: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Invalid CurrentUser" }, { status: 400 });
  }

  const { id } = params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  // Find the booking ticket
  const booking = await prisma.transaction.findUnique({
    where: { id: id },
  });

  if (!booking) {
    return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  }

  // Check if the user is the owner of the booking ticket
  if (booking.userId !== currentUser.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Check if the booking has expired
  const currentDate = new Date(); 
  const targetDate = new Date(booking.watchDate); 
  const [hours, minutes] = booking.watchTime.split(':').map(Number);
  // Sets the target time to the given time, but with the same date as the current date
  targetDate.setHours(hours);
  targetDate.setMinutes(minutes);
  targetDate.setSeconds(0);
  targetDate.setMilliseconds(0);
  const isExpired = targetDate.getTime() < currentDate.getTime()

  if (isExpired) {
    // If booking has expired, return a response indicating it's expired
    await prisma.transaction.delete({ where: { id: id } });

    return NextResponse.json(
      { message: "Booking has expired" },
      { status: 200 }
    );
  }

  // Return the user's balance
  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      balance: {
        increment: booking.totalPrice, // Return the booking amount to the user's balance
      },
    },
  });

  // Delete the booking ticket
  await prisma.transaction.delete({ where: { id: id } });

  return NextResponse.json({ message: "Booking canceled successfully" });
}
