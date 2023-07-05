import Breadcrumbs from "@/components/Breadcrumbs";
import Cards from "@/components/Cards";
import React from "react";
import getMovies from "../actions/getMovies";



// Movies Page
export default async function Page() {
  const movies = await getMovies();
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
      <div className="w-full px-6 md:px-20 pt-[100px] lg:pt-[130px] flex flex-col gap-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        {/* Mapping movie data into cards component */}
        <div className="w-full flex flex-col lg:flex-row lg:flex-wrap gap-7 lg:gap-10 justify-center">
          {movies.map((movie: any) => {
            return (
              <Cards key={movie.id} size="medium" isFavorited data={movie} />
            );
          })}
        </div>
      </div>
    </main>
  );
}
