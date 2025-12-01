import "./globals.css";
import { Urbanist } from "next/font/google";
import AuthWrapper from "@/features/auth/components/AuthWrapper";
import SessionExpiredPopup from "@/features/auth/components/SessionExpiredPopup";
import StoreProvider from "@/lib/redux/StoreProvider";

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
        <StoreProvider>
          <AuthWrapper>
            <SessionExpiredPopup />
            {children}
          </AuthWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
