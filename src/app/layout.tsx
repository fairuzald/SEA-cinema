import Navbar from "@/components/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import ClientOnly from "@/components/ClientOnly";
import { Toaster } from "react-hot-toast";
import RegisterModals from "@/components/modals/RegisterModal";
import LoginModals from "@/components/modals/LoginModal";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import Footer from "@/components/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "SEA Cinema",
    template: "%s | SEA Cinema",
  },
  description: "SEA cinem a movie booking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className} aria-label="Body">
        <ClientOnly>
          <NextAuthProvider>
            <Navbar />
            <Toaster />
            <RegisterModals />
            <LoginModals />
            <div>{children}</div>
            <div id="portals"></div>
            <Footer />
          </NextAuthProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
