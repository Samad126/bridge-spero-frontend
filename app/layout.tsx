import Header from "@/features/layout/Header";
import "./globals.css";
import Footer from "@/features/layout/Footer";
import { Urbanist } from "next/font/google";

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
        <main className="space-y-[60px] lg:space-y-[80px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
