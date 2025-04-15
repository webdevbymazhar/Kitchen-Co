"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { WishlistProvider } from "@/context/WishlistContext";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { AnimatePresence } from "framer-motion";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Define routes where you want to hide the footer
  const hideFooterOnRoutes = [
    "/admindashboard",
    "/addtable",
    "/addsimorder",
    "/addmenu",
    "/customer",
    "/addorder",
    "/setting",
    "/reports",
  ];
  const shouldShowFooter = !hideFooterOnRoutes.includes(pathname);

  // Show loading screen for 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <SessionProvider>
          <WishlistProvider>
            <AnimatePresence mode="wait" initial={false}>
              {isLoading ? (
                <LoadingScreen key="loading" />
              ) : (
                <>
                  {children}
                  {shouldShowFooter && <Footer />}
                </>
              )}
            </AnimatePresence>
          </WishlistProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
