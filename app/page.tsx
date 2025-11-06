import FAQ from "@/features/homepage/components/FAQ/FAQ";
import Hero from "@/features/homepage/components/Hero";
import TrendingGroups from "@/features/homepage/components/TrendingGroups/TrendingGroups";
import TrendingTeachers from "@/features/homepage/components/TrendingTeachers/TrendingTeachers";
import WhyBridgeSpero from "@/features/homepage/components/WhyBridgeSpero/WhyBridgeSpero";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyBridgeSpero />
      <TrendingGroups />
      <TrendingTeachers />
      <FAQ />
    </>
  );
}
