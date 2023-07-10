import prisma from "@/app/libs/prismadb";

export default async function getReceivedBalance(userId: string) {
  try {
    // Check if userId is defined and of type string
    if (!userId || typeof userId !== "string") {
      throw new Error("User not found");
    }
    
    // Query the database using Prisma to retrieve shared balances
    const sharedBalances = await prisma.shareBalance.findMany({
      where: {
        senderId: userId,
      },
      include: {
        receiver: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    // Format the retrieved shared balances into a new array
    const formattedSharedBalances = sharedBalances.map((balance) => {
      return {
        id: balance.id,
        senderId: balance.senderId,
        receiverId: balance.receiverId,
        amount: balance.amount,
        createdAt: balance.createdAt,
        receiverName: balance.receiver.name,
      };
    });
    
    // Return the formatted shared balances
    return formattedSharedBalances;
  } catch (error: any) {
    // If any error occurs, catch it and throw a new error
    throw new Error(error);
  }
}
