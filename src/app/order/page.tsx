import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Timer from "@/components/Timer";
import Image from "next/image";

export const dynamicParams = true;

// Page Movie Details
export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <main className="w-full min-h-screen flex flex-col gap-20 bg-background">
      {/* Container */}
      <div className="w-full px-40 pt-[130px] flex flex-col gap-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        <div className="w-full flex flex-col justify-center rounded-2xl ">
          {/* Movies Info */}
          <div className="w-full px-24 py-10  gap-40 flex flex-1">
            <Image
              src="https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
              width="1920"
              height="1080"
              alt="image"
              className="rounded-xl w-[359px] h-[473px] object-center object-cover "
            />
            {/* Text Movie Info */}
            <div className="flex flex-col gap-2">
              {/* Title */}
              <h2 className="text-red font-bold text-4xl">
                The Super MArio Bros
              </h2>
              {/* Description */}
              <p className="text-white font-medium text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem, voluptas blanditiis ducimus aspernatur dolore quas!
              </p>
              {/* Age */}
              <p className="bg-white rounded-lg text-black text-center p-2 font-bold w-fit">
                23 +
              </p>
              {/* Mall */}
              <p className="text-white font-medium text-lg">XX7 Mall ABC</p>
              {/* Locatioun */}
              <p className="text-white font-medium text-lg">Jl. Raya ABC</p>
              {/* Date */}
              <p className="text-white font-medium text-lg">
                Sabtu, 7 Juli 2023, 15.50
              </p>
            </div>
          </div>
          {/* Order number */}
          <p className="flex text-white font-semibold text-xl px-24 py-8 border-y-[2px]">
            Order Number: 190283018309
          </p>
          {/* Booking Info */}
          <div className="w-full px-24 py-14 gap-6 flex flex-col ">
            {/* Transaction Detail subtitle */}
            <p className="text-white font-semibold text-xl">
              Transaction Details
            </p>
            <div className=" gap-x-20 flex ">
              {/* Placeholder data */}
              <div className="text-white font-medium text-xl flex flex-col gap-3">
                <p>3 Ticket</p>
                <p>Each Seat</p>
              </div>
              {/* Data Booking Info */}
              <div className="text-white font-medium text-xl flex flex-col gap-3">
                <p>A1, A2, A3</p>
                <p>
                  Rp 50.000<span className="text-gray"> x 3</span>
                </p>
              </div>
            </div>
          </div>
          {/* Payment timer */}
          <div className="flex text-white font-semibold text-xl px-24 py-8 border-y-[2px] gap-20">
            <p>Complete Payment in</p>
            <Timer />
          </div>
          {/* Warn */}
          <p className="text-red-hover font-medium text-lg py-10 px-24">
            * Make sure all data is correct
          </p>
        </div>
      </div>
      {/* Footer */}
      <div className="w-[calc(100%-40px)] pb-32 mx-auto px-10 flex flex-col gap-14 border-t-[2px] border-white">
       {/* Total Price */}
        <div className="flex justify-between py-8 px-36">
          <p className="text-gray font-medium text-xl">Total Payment</p>
          <p className="text-white font-bold text-2xl">Total Payment</p>
        </div>
        <div className="flex mx-auto"><Button color="red" size="large">BOOKING NOW</Button></div>
      </div>

    </main>
  );
}
