import prisma from "@/app/libs/prismadb";

export default async function getmovieById(params: { movieId: string }) {
  try {
    // Validation on params and movie id from query
    const { movieId } = params;
    if (!movieId || typeof movieId !== "string") {
      throw new Error("Invalid ID");
    }

    // Retrieve movie from database based on movie id
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    
    // Error movie not found
    if (!movie) {
      return null;
    }
    return {
      ...movie,
      release_date: movie.release_date.toISOString(),
    };
  } catch (err: any) {
    throw new Error(err);
  }
}
