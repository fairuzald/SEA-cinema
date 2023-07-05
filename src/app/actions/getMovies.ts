import prisma from "@/app/libs/prismadb";

export default async function getMovies() {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: {
        release_date: "desc",
      },
    });

    const safeMovies = movies.map((movie) => ({
      ...movie,
      release_date: movie.release_date.toISOString(),
    }));

    return safeMovies;
  } catch (error: any) {
    throw new Error(error);
  }
}
