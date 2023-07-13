import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import Link from "next/link";
import getCurrentUser from "./actions/getCurrentuser";
export const dynamic = "force-dynamic"

// Function to fetch movies data from the API
async function getMovies() {
  const movies = await (
    await fetch("https://seleksi-sea-2023.vercel.app/api/movies")
  ).json();
  if (!movies) {
    return null;
  }
  return movies;
}

export default async function Home() {
  // Fetch movies data
  const movies = await getMovies();

  // Set current date
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Set the date four weeks ago
  const fourWeeksAgo = new Date(
    currentDate.getTime() - 4 * 7 * 24 * 60 * 60 * 1000
  );
  fourWeeksAgo.setHours(0, 0, 0, 0);

  // Filter movies based on release date within the current date and four weeks ago
  const moviesNow = movies.filter((movie: any) => {
    const releaseDate = new Date(movie.release_date);
    releaseDate.setHours(0, 0, 0, 0);
    return releaseDate >= fourWeeksAgo && releaseDate <= currentDate;
  });
  return (
    <main className="text-red-500 bg-background min-h-screen">
      {/* Background section */}
      <div className="w-full h-screen">
        {/* Big Background Image */}
        <Image
          src="/background.jpg"
          alt="Background"
          width="1920"
          height="1080"
          className="relative w-full h-full object-center object-cover fill-soft-black opacity-60"
        />
        <div className="gap-8 w-full flex-col absolute z-[15] top-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Text Content */}
          <h2 className="text-center text-white font-extrabold text-3xl lg:text-4xl xl:text-[42px] xl:leading-[49px] lg:tracking-wider w-[calc(100%-50px)] md:w-[calc(100%-200px)] lg:w-[750px]">
            Don&apos;t miss out on the hottest movies of the season. Get your
            tickets today <Link href="/movies">Tes</Link>
          </h2>
          {/* Button Order */}
          <Button size="large" color="red">
            Order Now
          </Button>
        </div>
      </div>

      {/* Display movies currently showing in cinemas */}
      {moviesNow.length > 0 && (
        <div className="w-full flex px-20 gap-10 flex-col py-10">
          {/* Title Showing Now Cinemas Section */}
          <h3 className="text-red text-3xl font-bold text-left">
            Now Showing In Cinemas
          </h3>
          <div className="w-full px-[200px] overflow-hidden">
            <Carousel data={moviesNow} />
          </div>
        </div>
      )}
    </main>
  );
}
