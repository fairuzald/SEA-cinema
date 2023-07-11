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

// Generate metadata title filfill the templates
export const metadata = {
  title: "Watchlist Page"
}

// WatchlistPage
export default async function WatchListPage() {
  // Fetch required data
  const favoritedMovies = await getFavoriteMovies();
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
        {/* Mapping favorited movie data into cards component */}
        {favoritedMovies.length > 0 ? (
          <div className="w-full flex flex-col lg:flex-row lg:flex-wrap gap-7 lg:gap-10 justify-center">
            {favoritedMovies.map((movie: SafeMovie) => {
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
          // If there's no data watchlist found
          <div className="flex w-full items-center flex-col sm:w-[calc(100%-20px)] gap-10 lg:mx-auto lg:w-[650px] flex-auto font-bold justify-center text-white text-2xl text-center lg:text-3xl">
            Not found your Watchlist Movie, Go to the movies page and press love to add it to your watchlist
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
