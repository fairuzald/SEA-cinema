import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentuser";

export default async function getFavoriteMovies() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const favorites = await prisma.movie.findMany({
      where: {
        id: {
          in: [...(currentUser.favoritedIds || [])],
        },
      },
      orderBy: {
        release_date: "desc",
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      release_date: favorite.release_date.toISOString(),
    }));

    return safeFavorites;
  } catch (err: any) {
    throw new Error(err);
  }
}
