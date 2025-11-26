"use client";

import { useParams } from "next/navigation";

function Hero() {
  const { id } = useParams();

  return (
    <section>
      <div className="container">
        <h2 className="text-center text-primary text-[34px] leading-[130%] font-normal tracking-[0%] xxl:text-[54px]">
          {id ? "Edit Group" : "Create New Group"}
        </h2>
        <p className="text-[16px] leading-[130%] text-center max-w-[320px] mx-auto mt-[18px] mb-[42px] md:mt-[16px] md:mb-[50px] md:text-[18px] md:max-w-[386px] lg:text-[20px]">
          {id
            ? "Update your group details and manage settings"
            : "Set up your learning group and start teaching"}
        </p>
      </div>
    </section>
  );
}

export default Hero;
