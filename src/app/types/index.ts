import { Movie } from "@prisma/client";

export type SafeMovie = Omit<Movie, "release_date"> & {
  release_date: string;
};
