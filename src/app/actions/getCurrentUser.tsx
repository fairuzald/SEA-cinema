import { AuthOptions, getServerSession } from "next-auth";
import prisma from "../libs/prismadb";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions as AuthOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.name) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: { username: session.user.name },
    });
    if (!currentUser) {
      return null;
    }
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
    };
  } catch (err) {
    console.log(err);
  }
}
