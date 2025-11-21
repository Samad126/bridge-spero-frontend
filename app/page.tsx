import FAQ from "@/features/homepage/components/FAQ/FAQ";
import Hero from "@/features/homepage/components/Hero";
import TrendingGroups from "@/features/homepage/components/TrendingGroups/TrendingGroups";
import TrendingTeachers from "@/features/homepage/components/TrendingTeachers/TrendingTeachers";
import WhyBridgeSpero from "@/features/homepage/components/WhyBridgeSpero/WhyBridgeSpero";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Bridge Spero | Smarter Education Smarter Generation",
  description: "Delivering high-quality education designed to prepare you for the future"
}

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
