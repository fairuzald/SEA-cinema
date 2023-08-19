import prisma from "@/app/libs/prismadb";

export default async function getBooking(userId: string) {
  try {
    // Validation for userId
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid User ID");
    }
    // Retrieve transactions data from database by userId
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
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
