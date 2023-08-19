import getMovies from "@/app/actions/getMovies";
import MovieClient from "./MovieClient";
import getmovieById from "@/app/actions/getMovieById";
import getLocations from "@/app/actions/getLocations";
import { SafeMovie } from "@/app/types";
import { User } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentuser";
import { Metadata, ResolvingMetadata } from "next";
import getAllBookings from "@/app/actions/getAllBookings";
export const dynamic = "force-dynamic";

// Generate dynamic metadata title
type Props = {
  params: { movieId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const product = await getmovieById(params);

  return {
    title: product?.title,
  };
}

// Fallback blocking to make static page allowed based on id movie data
export const dynamicParams = false;
export async function generateStaticParams() {
  const movies = await getMovies();

  return movies.map((movie: any) => ({
    movieId: movie.id.toString(),
  }));
}

// Page Movie Details
export default async function MovieDetailsPage({
  params,
  searchParams,
}: Props) {
  // fetch required data to mapping detail moviess
  const movie = await getmovieById(params);
  const locations = await getLocations();
  const currentUser = await getCurrentUser();
  const bookings = await getAllBookings();

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
