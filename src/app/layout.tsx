import Navbar from "@/components/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import ClientOnly from "@/components/ClientOnly";
import { Toaster } from "react-hot-toast";
import RegisterModals from "@/components/modals/RegisterModals";
import LoginModals from "@/components/modals/LoginModals";
import { NextAuthProvider } from "@/components/NextAuthProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "SEA Cinema",
  description: "SEA cinem a movie booking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ClientOnly>
          <NextAuthProvider>
            <Navbar />
            <Toaster />
            <RegisterModals />
            <LoginModals />
            <div>{children}</div>
            <div id="portals"></div>
          </NextAuthProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
