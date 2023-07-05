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
     

    </main>
  );
}
