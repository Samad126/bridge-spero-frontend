import { JWTPayload } from "@/features/auth/types/authTypes";
import { parseJwt } from "@/features/common/util/commonUtils";
import Footer from "@/features/layout/components/Footer";
import Header from "@/features/layout/Header/components/Header";
import { cookies } from "next/headers";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React from "react";

async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token");
  const refresh_token = cookieStore.get("refresh_token");

  const userDataFromAccessToken: JWTPayload | null = parseJwt(access_token?.value || "");
  const userDataFromRefreshToken: JWTPayload | null = parseJwt(refresh_token?.value || "");

  const userData = userDataFromAccessToken || userDataFromRefreshToken;

  return (
    <NuqsAdapter>
      <Header role={userData ? userData.role : null} />
      <main className="space-y-[60px] my-[60px] lg:space-y-[80px] lg:mb-[80px] lg:mt-[100px]">
        {children}
      </main>
      <Footer role={userData ? userData.role : null} />
    </NuqsAdapter>
  );
}

export default layout;
