import Header from "@/features/layout/components/Header";
import "./globals.css";
import { Urbanist } from "next/font/google";
import Footer from "@/features/layout/components/Footer";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable}`}>
        <Header />
        <main className="space-y-[60px] mb-[60px] lg:space-y-[80px] lg:mb-[80px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
