import prisma from "@/app/libs/prismadb";

export default async function getWithdrawal(userId: string) {
  try {
    // Check if userId is defined and of type string
    if (!userId || typeof userId !== "string") {
      throw new Error("User not found");
    }

    // Query the database using Prisma to retrieve withdrawal data
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
      orderBy: { createdAt: "desc" },
    });

    // Map the retrieved withdrawals and add a userName property to each object
    return withdrawals.map((withdrawal) => {
      return {
        ...withdrawal,
        userName: withdrawal.user.name,
      };
    });
  } catch (error: any) {
    // If any error occurs, catch it and throw a new error
    throw new Error(error);
  }
}
