import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import AuthenticWhatsAppButton from "@/components/whatsappButton";
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
    <html lang="en" className="scrollbar-hide dark">
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body
        className={`${inter.className} antialiased`}
      >
    
        {/* <StickyNavbar/> */}
        {children}


        {/* <FloatingButton/> */}

        <AuthenticWhatsAppButton phoneNumber="+6281381024919" message="" />

        {/* <Footer/> */}
        
      </body>
    </html>
  );
}
