import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto text-center mt-[120px]">
      <div id="hero">
        <h1 className="text-primary leading-[130%] text-[38px] md:text-[80px]">
          Smarter Education
          <br />
          Smarter Generation
        </h1>
        <p className="text-[20px] leading-[130%] text-center max-w-[386px] mx-auto mt-[18px] mb-[42px] md:mt-[16px] md:mb-[50px]">
          Delivering high-quality education designed to prepare you for the
          future
        </p>
        <div className="flex flex-col gap-[12px] max-w-[200px] mx-auto md:max-w-[424px] md:flex-row md:gap-[24px] justify-between">
          <Link className="md:flex-1 py-[12px] border bg-secondary text-custom-white" href={"/explore"}>Explore</Link>
          <Link className="md:flex-1 border bg-white py-[12px]" href={"/login"}>Become a Teacher</Link>
        </div>
      </div>
    </div>
  );
}
