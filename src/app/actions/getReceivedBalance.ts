import prisma from "@/app/libs/prismadb";

export default async function getReceivedBalance(userId: string) {
  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("User not found");
    }

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
    });

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

    return formattedReceivedBalances;
  } catch (error: any) {
    throw new Error(error);
  }
}
