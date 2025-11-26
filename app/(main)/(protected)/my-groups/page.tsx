import Groups from "@/features/my-groups/components/Groups";
import Hero from "@/features/my-groups/components/Hero";
import Search from "@/features/my-groups/components/Search";

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
