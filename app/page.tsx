import FAQ from "@/features/homepage/components/FAQ/FAQ";
import Hero from "@/features/homepage/components/Hero";
import TrendingGroups from "@/features/homepage/components/TrendingGroups/TrendingGroups";
import TrendingTeachers from "@/features/homepage/components/TrendingTeachers/TrendingTeachers";

export default function Home() {
  return (
    <>
      <Hero />
      <TrendingGroups />
      <TrendingTeachers />
      <FAQ />
    </>
  );
}
