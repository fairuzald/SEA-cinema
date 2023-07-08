import { getServerSession } from "next-auth";
import prisma from "../libs/prismadb";
import { authOptions } from "../api/auth/[...nextauth]/route";

// getsession from next auth getserversession
export async function getSession() {
  return await getServerSession(authOptions);
}
// Fetch getcurrentuser await getsession
export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.name) {
      return null;
    }
    const currentUser = await prisma.user.findFirst({
      where: { name: session.user.name },
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (err) {
    console.log(err);
  }
}
