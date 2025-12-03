import Hero from "@/features/explore-groups/components/Hero";
import Search from "@/features/explore-teachers/components/Search";
import Teachers from "@/features/explore-teachers/components/Teachers";

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
