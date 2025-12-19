import About from "@/features/about/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haqqımızda | Bridge Spero",
  description:
    "BridgeSpero müəllimlərlə tələbələri birləşdirən, interaktiv və əlçatan təhsil təcrübəsi təqdim edən rəqəmsal öyrənmə platformasıdır.",
  keywords:
    "haqqımızda, BridgeSpero, online təhsil, rəqəmsal öyrənmə, təhsil platforması, Azərbaycan",
};

const page = () => {
  return <About />;
};

export default page;
