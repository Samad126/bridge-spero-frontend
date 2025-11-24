import Groups from "@/features/explore-groups/Groups";
import Hero from "@/features/explore-groups/Hero";
import Search from "@/features/explore-groups/Search";

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
