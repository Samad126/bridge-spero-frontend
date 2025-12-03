import Groups from "@/features/explore-groups/components/Groups";
import Hero from "@/features/explore-groups/components/Hero";
import Search from "@/features/explore-groups/components/Search";

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
