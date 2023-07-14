import Breadcrumbs from "@/components/Breadcrumbs";
import Cards from "@/components/Cards";
import React from "react";
import getMovies from "../actions/getMovies";
import getCurrentUser from "../actions/getCurrentuser";
import { SafeMovie } from "../types";
export const dynamic = "force-dynamic";

// Generate metadata title
export const metadata = {
  title: "Movies Page"
}

// Movies Page
export default async function MoviesPage() {
  const movies = await getMovies();
  const currentUser = await getCurrentUser();
  
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
      <div className="w-full px-6 md:px-20 pt-[100px] pb-20 lg:p-[130px] flex flex-col gap-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        {/* Mapping movie data into cards component */}
        <section className="w-full flex flex-col lg:flex-row lg:flex-wrap gap-7 lg:gap-10 justify-center">
          {movies.map((movie: SafeMovie) => {
            return (
              <Cards
                key={movie.id}
                size="medium"
                currentUser={currentUser}
                isFavorited
                data={movie}
              />
            );
          })}
        </section>
      </div>
    </main>
  );
}
