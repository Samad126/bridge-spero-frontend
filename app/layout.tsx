import Header from "@/features/layout/Header";
import "./globals.css";
import Footer from "@/features/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        <main className="space-y-[60px] lg:space-y-[80px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
