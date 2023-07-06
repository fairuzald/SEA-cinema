"use client"; // Error components must be Client Components

import Button from "@/components/Button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="w-full min-h-screen flex bg-background">
      <h2 className="text-2xl lg:text-3xl font-bold ">Something went wrong!</h2>
      <Link href="/">
        <Button color="trans-red" size="large">
          Back to Home Page
        </Button>
      </Link>
      Try again
    </main>
  );
}
