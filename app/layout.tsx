import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import StickyNavbar from "@/components/component/navbar";
import FloatingButton from "@/components/component/floatingButton";
import Footer from "@/components/component/footer";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Rakitinlah.id",
  description: "Build your dream PC with Rakitinlah.id",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  viewportFit: "cover",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={`${inter.className} antialiased bg-rakitin-bg `}
      >
        {/* <StickyNavbar/> */}
        {children}


        {/* <FloatingButton/> */}



        {/* <Footer/> */}
        
      </body>
    </html>
  );
}
