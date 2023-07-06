import prisma from "@/app/libs/prismadb";

export default async function getBooking(userId: string) {
  try {
    if (!userId) {
      return []
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      include: {
        movie: true,
        location: true,
      },
    });

    return transactions;
  } catch (error: any) {
    throw new Error(error);
  }
}
