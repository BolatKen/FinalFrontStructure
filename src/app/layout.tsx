import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/core.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import Subscribe from "@/components/sections/Subscripbe/Subscribe";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Subscribe />
        {/* <Footer /> */}
      </body>
    </html>
  );
}
