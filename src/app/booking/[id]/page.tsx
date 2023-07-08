import getBookingById from "@/app/actions/getBookingById";
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
