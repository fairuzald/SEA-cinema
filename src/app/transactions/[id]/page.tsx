import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
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
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
      <div className="w-full px-32 pt-[130px] flex flex-col gap-7">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        <div className="w-full flex flex-col justify-center rounded-2xl border-gray border">
          {/* Movies Info */}
          <div className="w-full px-24 py-10  border-b border-gray gap-20 flex justify-between items-center">
            <Image
              src="https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
              width="1920"
              height="1080"
              alt="image"
              className="rounded-xl w-[269px] h-[393px] object-center object-cover "
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
              <p className="bg-white rounded-lg text-black text-center w-fit">23 +</p>
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
          {/* Booking Info */}
          <div className="w-full px-24 py-10 border-b border-gray gap-x-20 flex  items-center">
            {/* Placeholder data */}
            <div className="text-white font-medium text-xl flex flex-col gap-2">
              <p>Code Booking</p>
              <p>3 Ticket</p>
              <p>Each Seat</p>
            </div>
            {/* Data Booking Info */}
            <div className="text-white font-medium text-xl flex flex-col gap-2">
              <p>3123123123131</p>
              <p>A1, A2, A3</p>
              <p>
                Rp 50.000<span className="text-gray"> x 3</span>
              </p>
            </div>
          </div>
          {/* Payment Status */}
          <div className="w-full px-24 py-10 border-b border-gray gap-20 flex  items-center">
            {/* Placeholder data */}
            <div className="text-white font-medium text-xl flex flex-col gap-2">
              <p>Total Payment</p>
              <p>Status</p>
            </div>
            {/* Data Booking Info */}
            <div className="text-white font-medium text-xl flex flex-col gap-2">
              <p>Rp. 600000</p>
              <Button color="red">Success</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
