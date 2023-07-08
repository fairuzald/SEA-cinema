import getBookingById from "@/app/actions/getBookingById";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import { format } from "date-fns";
import Image from "next/image";
export const dynamicParams = true;
export const dynamic = "force-dynamic";

// Page Movie Details
export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const booking = await getBookingById(id);
  const formattedDate = (dateTime: Date, isTime?: boolean) => {
    if(isTime) {
      return format(new Date(dateTime), "EEEE, dd MMM yyyy | HH:MM");
    }
    return format(new Date(dateTime), "EEEE, dd MMM yyyy");
  };
  return (
    <main className="w-full min-h-screen overflow-hidden flex bg-background">
      {/* Container */}
      <div className="w-full px-5 sm:px-20 lg:px-16 overflow-hidden my-20 2xl:px-28 lg:pt-[60px] flex flex-col gap-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        <div className="w-full flex flex-col justify-center rounded-2xl border-gray border">
          {/* Booking Info */}
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 border-b border-gray gap-8 lg:gap-14 2xl:gap-20 flex flex-col lg:flex-row justify-between items-center">
            <Image
              src={booking.movie.poster_url}
              width="1920"
              height="1080"
              alt={booking.movie.title}
              className="rounded-xl w-[200px] h-[350px] lg:w-[269px] lg:h-[393px] object-center object-cover "
            />
            {/* Text Movie Info */}
            <div className="flex flex-col gap-2.5">
              {/* Title */}
              <h2 className="text-red font-bold text-2xl lg:text-4xl">
                {booking.movie.title}
              </h2>
              {/* Description */}
              <p className="text-white font-medium text-sm lg:text-lg">
                {booking.movie.description}
              </p>
              {/* Age */}
              <p className="bg-white rounded-lg text-black text-sm lg:text-lg font-bold p-1.5 lg:px-2 text-center w-fit">
                {booking.movie.age_rating} +
              </p>
              {/* Mall */}
              <p className="text-white font-medium text-sm lg:text-lg">
                {booking.location.mall}
              </p>
              {/* Locatioun */}
              <p className="text-white font-medium text-sm lg:text-lg">
                {booking.location.address}
              </p>
              {/* Date */}
              <p className="text-white font-medium text-sm lg:text-lg">
                {formattedDate(booking.watchDate)} | {booking.watchTime}
              </p>
            </div>
          </div>
          {/* Booking Info */}
          <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 border-b border-gray gap-x-20 flex  items-center">
            {/* Placeholder data */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2.5">
              <p>Code Booking </p>
              <p>Booking DateTime </p>
              <p>{booking.seat.length} Ticket</p>
              <p>Each Seat</p>
            </div>
            {/* Data Booking Info */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2.5">
              <p>{booking.id}</p>
              <p>{formattedDate(booking.createdAt, true)}</p>
              <p>{booking.seat.map((item) => item + ",")}</p>
              <p>
                Rp {booking.movie.ticket_price}
                <span className="text-gray"> x {booking.seat.length}</span>
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
              <p>Rp. {booking.totalPrice}</p>
              <Button color="red">{booking.status as string}</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
