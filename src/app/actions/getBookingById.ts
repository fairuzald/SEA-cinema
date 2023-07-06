import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentuser";

export default async function getBookingById(id: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("Invalid current user");
    }

    const transactions = await prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        movie: true,
        location: true,
      },
    });
    if (currentUser.id !== transactions?.userId) {
      throw new Error("Invalid user access");
    }
    return transactions;
  } catch (error: any) {
    throw new Error(error);
  }
}
