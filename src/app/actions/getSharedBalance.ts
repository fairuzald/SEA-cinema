import prisma from "@/app/libs/prismadb";

export default async function getReceivedBalance(userId: string) {
  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("User not found");
    }
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
    });

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

    return formattedSharedBalances;
  } catch (error: any) {
    throw new Error(error);
  }
}
