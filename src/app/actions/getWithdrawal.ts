import prisma from "@/app/libs/prismadb";
export default async function getWithdrawal(userId: string) {
  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("User not found");
    }
    const withdrawals = await prisma.withdrawal.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return withdrawals.map((withdrawal) => {
      return {
        ...withdrawal,
        userName: withdrawal.user.name,
      };
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
