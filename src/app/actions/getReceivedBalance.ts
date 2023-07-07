import prisma from "@/app/libs/prismadb";

export default async function getReceivedBalance(userId: string) {
  try {
    // Check if userId is defined and of type string
    if (!userId || typeof userId !== "string") {
      throw new Error("User not found");
    }

    // Query the database using Prisma to retrieve received balances
    const receivedBalances = await prisma.shareBalance.findMany({
      where: {
        receiverId: userId,
      },
      include: {
        sender: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format the received balances into a new array
    const formattedReceivedBalances = receivedBalances.map((balance) => {
      return {
        id: balance.id,
        senderId: balance.senderId,
        receiverId: balance.receiverId,
        amount: balance.amount,
        createdAt: balance.createdAt,
        senderName: balance.sender.name,
      };
    });

    // Return the formatted received balances
    return formattedReceivedBalances;
  } catch (error: any) {
    // If any error occurs, catch it and throw a new error
    throw new Error(error);
  }
}
