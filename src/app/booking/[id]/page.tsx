import getBooking from "@/app/actions/getBooking";
import getBookingById from "@/app/actions/getBookingById";
import getCurrentUser from "@/app/actions/getCurrentuser";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import { format } from "date-fns";
import Image from "next/image";
import { toast } from "react-hot-toast";
import DetailsBookingClient from "./DetailsBookingClient";
export const dynamicParams = true;
export const dynamic = "force-dynamic";
// export async function generateStaticParams() {
//   const bookings = await getBookingParams();

//   return bookings?.map((booking: any) => ({
//     id: booking.id.toString(),
//   }));
// }
// Page Movie Details
export default async function MovieDetailsPage({
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
