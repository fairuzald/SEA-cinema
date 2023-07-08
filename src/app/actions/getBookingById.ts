import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentuser";

export default async function getBookingById(params: { id?: string }) {
  try {
    // Validating id from params
    const { id } = params;
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID");
    }

    // Retrieve currentUser data and add validation
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("Invalid current user");
    }

    // Try to get transactions data from prisma
    const transactions = await prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        movie: true,
        location: true,
        user: true
      },
    });

    // Validating that data only can acccess by current user
    if (currentUser.id !== transactions?.userId) {
      throw new Error("Invalid user access");
    }
    return transactions;
  } catch (error:any) {
    throw new Error(error);
  }
}
