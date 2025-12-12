import Hero from "@/features/explore-groups/components/Hero";
import Search from "@/features/explore-teachers/components/Search";
import Teachers from "@/features/explore-teachers/components/Teachers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Teachers | Bridge Spero",
  description:
    "Connect with experienced and qualified teachers. Browse through our community of educators and find the perfect teacher for your learning journey.",
  keywords: "teachers, tutors, educators, online teachers, Bridge Spero teachers, qualified instructors",
};

interface PageProps {
  searchParams: Promise<{
    name?: string;
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
      <Teachers searchParams={params} />
    </>
  );
}

export default page;
