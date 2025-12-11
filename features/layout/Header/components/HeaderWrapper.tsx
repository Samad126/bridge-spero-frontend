"use client";

import { useGetUserProfileOptionalQuery } from "@/features/profile/api/userProfileApi";
import { Header } from "./Header";

export function HeaderWrapper() {
  const { data: userData, isLoading } = useGetUserProfileOptionalQuery();

  return (
    <Header
      role={isLoading ? null : (userData?.role || null)}
      fullName={isLoading ? undefined : (userData ? `${userData.name} ${userData.surname}` : undefined)}
    />
  );
}
