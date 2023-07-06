import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentuser";

export default async function getBooking() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("Invalid current user");
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: currentUser.id,
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
