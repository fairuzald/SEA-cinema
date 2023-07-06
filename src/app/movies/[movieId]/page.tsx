import getMovies from "@/app/actions/getMovies";
import MovieClient from "./MovieClient";
import getmovieById from "@/app/actions/getMovieById";
import getLocations from "@/app/actions/getLocations";
import { SafeMovie } from "@/app/types";
import { Location, User } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentuser";
import getBooking from "@/app/actions/getBooking";
export const dynamicParams = false;

// Fallback blocking to make static page allowed based on id movie data
export async function generateStaticParams() {
  const movies = await getMovies();

  return movies.map((movie: any) => ({
    movieId: movie.id.toString(),
  }));
}

// Page Movie Details
export default async function MovieDetailsPage({
  params,
}: {
  params: { movieId: string };
}) {
  const movie = await getmovieById(params);
  const locations = await getLocations();
  const currentUser = await getCurrentUser();
  const bookings = await getBooking(currentUser?.id as string);

  return (
    <main className="w-full min-h-screen overflow-hidden flex bg-background">
      <MovieClient
        data={movie as SafeMovie}
        locations={locations}
        currentUser={currentUser as User}
        bookings={bookings}
      />
    </main>
  );
}
