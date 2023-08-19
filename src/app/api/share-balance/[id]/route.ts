import getCurrentUser from "@/app/actions/getCurrentuser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { id?: string } },
) {
  const currentUser = await getCurrentUser();

  // Validating currentUser
  if (!currentUser) {
    // If currentUser is invalid, return a JSON response with an error message and status code 400
    return NextResponse.json(
      { error: "Invalid Current User" },
      { status: 400 },
    );
  }

  // Retrieve id from body
  const { id } = params;

  // Validating id body
  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "Invalid Body" }, { status: 204 });
  }

  // Delete data sharedBalance with id from database
  const deletedSharedBalance = await prisma.shareBalance.delete({
    where: {
      id,
    },
  });

  // Return a JSON response with the deletedSharedBalance object
  return NextResponse.json({ deletedSharedBalance });
}
