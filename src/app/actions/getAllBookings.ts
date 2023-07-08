import prisma from "@/app/libs/prismadb";

export default async function getAllBookings() {
  try {
    // Retrieve transactions data from database by userId
    const transactions = await prisma.transaction.findMany({
      include: {
        movie: true,
        location: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return transactions;
  } catch (error: any) {
    throw new Error(error);
  }
}
