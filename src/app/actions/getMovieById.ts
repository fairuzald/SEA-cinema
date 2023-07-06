import prisma from "@/app/libs/prismadb";

export default async function getmovieById(params: {  movieId?: string;}) {
  try {
    const { movieId } = params;
    if (!movieId || typeof movieId !== "string") {
      throw new Error("Invalid ID");
    }
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      return null;
    }
    return {
      ...movie,
      release_date: movie.release_date.toISOString()
    };

    // Rest of your code goes here
  } catch (err:any) {
    throw new Error(err);
    // Handle the error here
  }
}
