import Breadcrumbs from "@/components/Breadcrumbs";
import Cards from "@/components/Cards";
import React from "react";
import getFavoriteMovies from "../actions/getFavoriteMovies";
import { SafeMovie } from "../types";
import getCurrentUser from "../actions/getCurrentuser";
import Link from "next/link";
import Button from "@/components/Button";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

// Generate metadata title
export const metadata = {
  title: "Watchlist Page"
}

// Movies Page
export default async function Page() {
  const movies = await getFavoriteMovies();
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return notFound();
  }
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
      <div className="w-full px-6 md:px-20 pt-[100px] lg:pt-[130px] flex flex-col gap-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        {/* Mapping movie data into cards component */}
        {movies.length > 0 ? (
          <div className="w-full flex flex-col lg:flex-row lg:flex-wrap gap-7 lg:gap-10 justify-center">
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
          </div>
        ) : (
          <div className="flex w-full items-center flex-col gap-10 justify-center flex-auto font-bold text-white text-3xl">
            Not found your Watchlist Movie
            <Link href="/movies">
              <Button color="trans-red" size="large">
                Go Movie Page
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
