import Groups from "@/features/explore-groups/components/Groups";
import Hero from "@/features/explore-groups/components/Hero";
import Search from "@/features/explore-groups/components/Search";

function page() {
  return (
    <>
      <Hero />
      <Search />
      <Groups />
    </>
  );
}

export default page;
