import Button from "@/components/Button";
import Cards from "@/components/Cards";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import Link from "next/link";
import getMovies from "./actions/getMovies";
import CardUpcomingCinema from "@/components/CardUpcomingCinema";
import getCurrentUser from "./actions/getCurrentuser";
import UpcomingSection from "@/components/UpcomingSection";
import { Movie } from "@prisma/client";
import CardFAQ from "@/components/CardFAQ";
export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch movies data
  const movies = await getMovies();
  const currentUser = await getCurrentUser();
  // Set current date
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Set the date four weeks ago
  const fourWeeksAgo = new Date(
    currentDate.getTime() - 4 * 7 * 24 * 60 * 60 * 1000,
  );
  fourWeeksAgo.setHours(0, 0, 0, 0);

  // Filter movies based on release date within the current date and four weeks ago
  const moviesNow = movies.filter((movie: any) => {
    const releaseDate = new Date(movie.release_date);
    releaseDate.setHours(0, 0, 0, 0);
    return releaseDate >= fourWeeksAgo && releaseDate <= currentDate;
  });

  // Filter upcoming movies based on release date
  const upcomingMovies = movies.filter((movie: any) => {
    const releaseDate = new Date(movie.release_date);
    releaseDate.setHours(0, 0, 0, 0);
    return currentDate < releaseDate;
  });

  // CardFAQ data
  const faqData = [
    {
      title: "What's SEA CINEMA?",
      description:
        "SEA Cinema is a dynamic movie ticket booking application created as a prerequisite for the Software Engineer Academy of Compfest. It offers a user-friendly interface, a comprehensive booking system, personalized recommendations, and a secure payment gateway. With real-time updates and community engagement features, SEA Cinema provides a seamless and immersive cinema experience for movie enthusiasts.",
    },
    {
      title: "What are the features available in SEA Cinema?",
      description:
        "SEA Cinema offers a variety of features to enhance the movie-watching experience. Users can browse through an extensive list of movies in the 'Movies' section, where they can access details and book tickets for their preferred films. The 'Transactions' feature allows users to track the history of balance transactions and view any changes made. In the 'Booking' section, users can conveniently see their upcoming booked tickets. The 'Profile' section enables users to manage and edit their profile information. Additionally, the 'Watchlist' feature allows users to mark films of interest, creating a personalized list for future reference. With these features, SEA Cinema provides a comprehensive platform for movie enthusiasts to explore, book tickets, and stay organized.",
    },
    {
      title: "How can I purchase movie tickets on SEA Cinema?",
      description:
        "To purchase tickets on SEA Cinema, follow these simple steps. Firstly, navigate to the 'Movies' page on the application. Browse through the extensive selection of films available and choose the one that captivates your interest. Once you've decided on a movie, select the desired date and day, followed by the preferred showtime and location. After finalizing these details, proceed to the seat selection phase, where you can choose your desired seating arrangement. Once you've selected your seats, it's time to complete the purchase. SEA Cinema provides a secure payment gateway for a seamless transaction process. Review the details, and confirm the payment. Congratulations! You have successfully purchased your movie tickets through SEA Cinema. Now, get ready to enjoy an immersive cinematic experience.",
    },
    {
      title: "How can I make changes to my balance on SEA Cinema?",
      description:
        "To make changes to your balance on SEA Cinema, including withdrawals, sharing balance, or topping up, follow these straightforward steps. Firstly, go to your profile page within the application. Once there, locate the section dedicated to managing your balance transactions. Click on the desired transaction type, such as 'Withdrawal,' 'Share Balance,' or 'Top-up.' Next, select the desired nominal amount for the transaction. Once you have chosen the amount, proceed with the transaction by following the prompts and providing any necessary information or authentication. Confirm the transaction details, and the changes to your balance will be processed accordingly. With these simple steps, you can easily manage your balance and perform transactions on SEA Cinema's profile page.",
    },
    {
      title: "How do I cancel an order on SEA Cinema? ",
      description:
        "To cancel an order on SEA Cinema, simply navigate to the 'Booking' page and apply any necessary filters to locate the specific booking. Once found, access the booking details and click on the 'Cancel Order' button. Confirm the cancellation and await a notification confirming the successful cancellation. Please note that refunds may take some time to process based on the original payment method used.",
    },
  ];
  return (
    <main className="text-red-500 bg-background min-h-screen">
      {/* Background section */}
      <section className="w-full h-screen">
        {/* Big Background Image */}
        <Image
          src="/background.jpg"
          alt="Background"
          width="1920"
          height="1080"
          className="relative w-full h-full object-center object-cover fill-soft-black opacity-60"
        />
        <div className="gap-8 w-full flex-col absolute z-[15] top-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Text Content of Background*/}
          <h1 className="text-center text-white font-extrabold text-3xl lg:text-4xl xl:text-[42px] xl:leading-[49px] lg:tracking-wider w-[calc(100%-50px)] md:w-[calc(100%-200px)] lg:w-[750px]">
            Don&apos;t miss out on the hottest movies of the season. Get your
            tickets today <Link href="/movies">Tes</Link>
          </h1>
          {/* Button Order */}
          <Link href="/movies">
            <Button size="large" color="red">
              Order Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Display movies currently showing in cinemas */}
      {moviesNow.length > 0 && (
        <section className="w-full flex px-8 lg:px-20 gap-10 flex-col py-10">
          {/* Title Showing Now Cinemas Section */}
          <h2 className="text-red text-2xl lg:text-3xl font-bold text-left">
            Now Showing In Cinemas
          </h2>
          {/* Mapping List of data */}
          <div className="w-full">
            <Carousel data={moviesNow} />
          </div>
        </section>
      )}
      {/* Display movies upcoming showing in cinemas */}
      {upcomingMovies.length > 0 && (
        <UpcomingSection data={upcomingMovies} currentUser={currentUser} />
      )}

      {/* Display FAQ Section */}
      <section className="w-full flex px-8 lg:px-32 gap-10 flex-col py-10 pb-[100px] lg:pb-[130px]">
        {/* Title FAQ Section */}
        <h2 className="text-red text-2xl text-center lg:text-3xl font-bold">
          FREQUENTLY ASK QUESTION (FAQ)
        </h2>
        {/* Mapping List of data */}
        <div className="w-full flex flex-col gap-5">
          {faqData.map((faq, index) => (
            <CardFAQ
              key={index}
              title={faq.title}
              description={faq.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
