"use client";

import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";
import { Header } from "./Header";

export function HeaderWrapper({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}) {
  const { data: userData, isLoading } = useGetUserProfileOptionalQuery(
    undefined,
    {
      skip: !access_token || !refresh_token,
    }
  );

  return (
    <Header
      role={isLoading ? null : userData?.role || null}
      fullName={
        isLoading
          ? undefined
          : userData
          ? `${userData.name} ${userData.surname}`
          : undefined
      }
    />
  );
}
