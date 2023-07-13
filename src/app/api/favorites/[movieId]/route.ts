import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentuser";
export async function POST(
  req: Request,
  { params }: { params: { movieId?: string } }
) {
  // Get current user
  const currentUser = await getCurrentUser();

  //   Add validation to make sure the user must be logged in
  if (!currentUser) {
    return NextResponse.json({ error: "Invalid CurrentUser" }, { status: 400 });
  }
  //   Params validation
  const { movieId } = params;
  if (!movieId || typeof movieId !== "string") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 204 });
  }
  // Get favoritedId before
  let favoritedIds = [...(currentUser.favoritedIds || [])];

  //   Push new Id to the data
  favoritedIds.push(movieId);

  //   Update the data on database
  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoritedIds },
  });
  return NextResponse.json(user);
}

export async function DELETE(
  req: Request,
  { params }: { params: { movieId?: string } }
) {
  // Get current user and validate if they are logged in
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  // Validation for params
  const { movieId } = params;
  if (!movieId || typeof movieId !== "string") {
    return NextResponse.json({ message: "Invalid ID" }, { status: 204 });
  }

  // Validate data before updating
  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
  });

  const favoritedIds = user?.favoritedIds || [];

  const isFavorite = favoritedIds.includes(movieId);
  if (!isFavorite) {
    return NextResponse.json({ message: "Data not found" }, { status: 201 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      favoritedIds: favoritedIds.filter((id) => id !== movieId),
    },
  });

  return NextResponse.json(updatedUser);
}
