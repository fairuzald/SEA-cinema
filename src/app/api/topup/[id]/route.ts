import getCurrentUser from "@/app/actions/getCurrentuser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
export async function DELETE(
  req: Request,
  { params }: { params: { id?: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Invalid CurrentUser" }, { status: 400 });
  }
  const { id } = params;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "Invalid Body" }, { status: 204 });
  }

  // Lakukan proses validasi atau otorisasi sesuai kebutuhan
  const topup = await prisma.topup.findUnique({
    where: { id },
  });

  if (!topup) {
    return NextResponse.json({ error: "Topup not found" }, { status: 404 });
  }

  if (topup.userId !== currentUser.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Hapus data topup berdasarkan ID
  const deletedTopup = await prisma.topup.delete({
    where: { id: id },
  });

  return NextResponse.json({ deletedTopup });
}
