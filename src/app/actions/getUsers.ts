import prisma from "@/app/libs/prismadb";

export default async function getUsers() {
  try {
    // Retrieve users data from database
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}
