import Groups from "@/features/explore-groups/components/Groups";
import Hero from "@/features/explore-groups/components/Hero";
import Search from "@/features/explore-groups/components/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Groups | Bridge Spero",
  description:
    "Discover and join learning groups across various subjects and languages. Find the perfect group to enhance your education with Bridge Spero.",
  keywords: "learning groups, online education, study groups, Bridge Spero groups, educational groups",
};

interface PageProps {
  searchParams: Promise<{
    groupName?: string;
    language?: string;
    pageNumber?: string;
    pageSize?: string;
  }>;
}

async function page({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <>
      <Hero />
      <Search />
      <Groups searchParams={params} />
    </>
  );
}

export default page;
