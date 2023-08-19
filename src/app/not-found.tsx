import Button from "@/components/Button";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex w-full min-h-screen bg-soft-black flex-auto flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold text-custom-blue text-white lg:text-3xl">
        Page not Found
      </h1>
      <Link href="/" className="w-[250px] mx-auto flex justify-center">
        <Button color="trans-red">
          <h2>Back to Main Page</h2>
        </Button>
      </Link>
    </main>
  );
};

export default NotFound;
