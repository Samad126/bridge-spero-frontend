import FAQ from "@/features/homepage/faq/components/FAQ";
import Hero from "@/features/homepage/hero/components/Hero";
import TrendingGroups from "@/features/homepage/trending-groups/components/TrendingGroups";
import TrendingTeachers from "@/features/homepage/trending-teachers/components/TrendingTeachers";
import WhyBridgeSpero from "@/features/homepage/why-bridge-spero/components/WhyBridgeSpero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bridge Spero | Smarter Education Smarter Generation",
  description:
    "Delivering high-quality education designed to prepare you for the future",
};

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
