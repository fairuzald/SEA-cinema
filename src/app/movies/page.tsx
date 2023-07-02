import Breadcrumbs from "@/components/Breadcrumbs";
import Cards from "@/components/Cards";
import React from "react";

// Fetch movies all movies data
async function getMovies() {
  const movies = await (
    await fetch("https://seleksi-sea-2023.vercel.app/api/movies")
  ).json();
  if (!movies) {
    return null;
  }
  return movies;
}

// Movies Page
const MoviesPage = async () => {
  const movies = await getMovies();
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
      <div className="w-full px-20 pt-[130px] flex flex-col gap-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        {/* Mapping movie data into cards component */}
        <div className="w-full flex flex-wrap gap-10 justify-center">
          {movies.map((movie: any) => {
            return (
              <Cards
                key={movie.id}
                size="medium"
                isFavorited
                data={movie}
                
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default MoviesPage;
