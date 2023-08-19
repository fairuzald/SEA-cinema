import getCurrentUser from "@/app/actions/getCurrentuser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { id?: string } },
) {
  // Retrieve the current user
  const currentUser = await getCurrentUser();

  // Validate the current user
  if (!currentUser) {
    return NextResponse.json({ error: "Invalid CurrentUser" }, { status: 400 });
  }

  // Retrieve the "id" parameter from the request's "params" object
  const { id } = params;

  // Validate the "id" parameter
  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "Invalid Body" }, { status: 204 });
  }

  // Perform any necessary validation or authorization process

  // Delete the withdrawal data from the database
  const deletedWithdrawal = await prisma.withdrawal.delete({
    where: {
      id: id,
    },
  });

  // Return a JSON response with the deletedWithdrawal object
  return NextResponse.json({ deletedWithdrawal });
}
