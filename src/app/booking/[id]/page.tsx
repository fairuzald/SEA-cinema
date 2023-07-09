import getBookingById from "@/app/actions/getBookingById";
import DetailsBookingClient from "./DetailsBookingClient";
import getBooking from "@/app/actions/getBooking";
import getCurrentUser from "@/app/actions/getCurrentuser";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

// Create metadata title for details booking
export const metadata = {
  title: "Details Booking"
}
// Generate Static params from database
export const dynamicParams = false;
export async function generateStaticParams() {
  const currentUser = await getCurrentUser();
  if(!currentUser){
    return notFound()
  }
  const bookings = await getBooking(currentUser?.id as string)

  return bookings?.map((booking: any) => ({
    id: booking.id.toString(),
  }));
}


export default async function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const booking = await getBookingById(params);

  return (
    <main className="w-full min-h-screen overflow-hidden flex bg-background">
      {/* Container */}
      <DetailsBookingClient booking={booking} id={params.id} />
    </main>
  );
}
