import Button from "@/components/Button";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex w-full min-h-screen bg-soft-black flex-auto flex-col items-center justify-center gap-6">
      <p className="text-2xl font-bold text-custom-blue text-white lg:text-3xl">
        Page not Found
      </p>
      <Link href="/" className="w-[250px] mx-auto flex justify-center">
        <Button color="trans-red">Back to Main Page</Button>
      </Link>
    </main>
  );
};

export default NotFound;
