import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Image from "next/image";
export const dynamic = 'force-dynamic'

export const dynamicParams = true;

// Page Movie Details
export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <main className="w-full min-h-screen overflow-hidden flex bg-background">
      {/* Container */}
      <div className="w-full px-5 sm:px-20 lg:px-16 overflow-hidden my-20 2xl:px-28 lg:pt-[60px] flex flex-col gap-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        <div className="w-full flex flex-col justify-center rounded-2xl border-gray border">
          {/* Movies Info */}
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 border-b border-gray gap-8 lg:gap-14 2xl:gap-20 flex flex-col lg:flex-row justify-between items-center">
            <Image
              src="https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
              width="1920"
              height="1080"
              alt="image"
              className="rounded-xl w-[200px] h-[350px] lg:w-[269px] lg:h-[393px] object-center object-cover "
            />
            {/* Text Movie Info */}
            <div className="flex flex-col gap-2.5">
                {/* Title */}
              <h2 className="text-red font-bold text-2xl lg:text-4xl">
                The Super MArio Bros
              </h2>
              {/* Description */}
              <p className="text-white font-medium text-sm lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem, voluptas blanditiis ducimus aspernatur dolore quas!
              </p>
              {/* Age */}
              <p className="bg-white rounded-lg text-black text-sm lg:text-lg font-bold p-1.5 lg:px-2 text-center w-fit">23 +</p>
              {/* Mall */}
              <p className="text-white font-medium text-sm lg:text-lg">XX7 Mall ABC</p>
              {/* Locatioun */}
              <p className="text-white font-medium text-sm lg:text-lg">Jl. Raya ABC</p>
              {/* Date */}
              <p className="text-white font-medium text-sm lg:text-lg">
                Sabtu, 7 Juli 2023, 15.50
              </p>
            </div>
          </div>
          {/* Booking Info */}
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 border-b border-gray gap-x-20 flex  items-center">
            {/* Placeholder data */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2.5">
              <p>Code Booking</p>
              <p>3 Ticket</p>
              <p>Each Seat</p>
            </div>
            {/* Data Booking Info */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2.5">
              <p>3123123123131</p>
              <p>A1, A2, A3</p>
              <p>
                Rp 50.000<span className="text-gray"> x 3</span>
              </p>
            </div>
          </div>
          {/* Payment Status */}
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 border-b border-gray gap-20 flex  items-center">
            {/* Placeholder data */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2">
              <p>Total Payment</p>
              <p>Status</p>
            </div>
            {/* Data Booking Info */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2">
              <p>Rp. 600000</p>
              <Button color="red">Success</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
