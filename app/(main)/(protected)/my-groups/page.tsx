import Groups from "@/features/my-groups/components/Groups";
import Hero from "@/features/my-groups/components/Hero";
import Search from "@/features/my-groups/components/Search";

interface PageProps {
  searchParams: Promise<{
    groupName?: string;
    language?: string;
    status?: string;
    categoryId?: string;
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
