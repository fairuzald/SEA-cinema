import prisma from "@/app/libs/prismadb";

export default async function getLocations() {
  try {
    const locations = await prisma.location.findMany({});

    return locations;
  } catch (error: any) {
    throw new Error(error);
  }
}
