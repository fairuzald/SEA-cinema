import MovieClient from "./MovieClient";

export const dynamicParams = false;

// Fallback blocking to make static page allowed based on id movie data
export async function generateStaticParams() {
  const movies = await fetch(
    "https://seleksi-sea-2023.vercel.app/api/movies"
  ).then((res) => res.json());

  return movies.map((movie: any) => ({
    movieId: movie.id.toString(),
  }));
}

// Fetch specified movie data based on id
async function getMovies(id: string) {
  const movies = await (
    await fetch("https://seleksi-sea-2023.vercel.app/api/movies")
  ).json();
  if (!movies) {
    return null;
  }
  const specifiedMovie = movies.filter((movie: any) => {
    return movie.id === parseInt(id);
  });
  return specifiedMovie;
}

// Page Movie Details
export default async function MovieDetailsPage({
  params,
}: {
  params: { movieId: string };
}) {
  const { movieId } = params;
  const movies = await getMovies(movieId);
  const movie = movies[0];

  return (
    <main className="w-full min-h-screen flex bg-background">
      <MovieClient data={movie} />
    </main>
  );
}
