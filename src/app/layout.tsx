import "@/styles/core.css";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer/Footer";
import Subscribe from "@/components/sections/Subscripbe/Subscribe";

import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Leka Beauty",
  description: "Сайт по обстановке барбершопов.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Subscribe />
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
