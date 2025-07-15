import "@/styles/core.css";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer/Footer";
import Subscribe from "@/components/sections/Subscripbe/Subscribe";
import PageLoader from "@/components/layout/PageLoader/PageLoader"; // Import the new component

import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Leka Beauty",
  description: "Сайт по обстановке барбершопов.",
  icons: {
    icon: "/favicon.svg", // /public pat
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageLoader /> {/* Add the loader here */}
        {children}
        <Subscribe />
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
