import Footer from "@/features/layout/components/Footer";
import { HeaderWrapper } from "@/features/layout/Header/components/HeaderWrapper";
import { cookies } from "next/headers";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React from "react";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if user has access token (is logged in) for footer
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token");
  const refresh_token = cookieStore.get("refresh_token");

  const isLoggedIn = !!access_token || !!refresh_token;

  return (
    <NuqsAdapter>
      <HeaderWrapper />
      <main className="space-y-[60px] my-[60px] lg:space-y-[80px] lg:mb-[80px] lg:mt-[100px]">
        {children}
      </main>
      <Footer role={isLoggedIn ? "USER" : null} />
    </NuqsAdapter>
  );
}

export default layout;
