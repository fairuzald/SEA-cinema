import prisma from "@/app/libs/prismadb";

export default async function getTopUp(userId: string) {
  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("User not found");
    }
    const topups = await prisma.topup.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return topups.map((topup) => {
      return {
        ...topup,
        userName: topup.user.name,
      };
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
