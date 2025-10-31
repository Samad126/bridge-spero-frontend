import Link from "next/link";

function Hero() {
  return (
    <section id="hero">
      <div className="container mx-auto text-center mt-[100px] md:mt-[120px]">
        <h1 className="text-primary leading-[130%] text-[38px] md:text-[64px] lg:text-[80px]">
          Smarter Education
          <br />
          Smarter Generation
        </h1>
        <p className="text-[16px] leading-[130%] text-center max-w-[320px] mx-auto mt-[18px] mb-[42px] md:mt-[16px] md:mb-[50px] md:text-[18px] md:max-w-[386px] lg:text-[20px]">
          Delivering high-quality education designed to prepare you for the
          future
        </p>
        <div className="flex flex-col gap-[12px] max-w-[200px] mx-auto md:max-w-[424px] md:flex-row md:gap-[24px] justify-between">
          <Link
            className="md:flex-1 py-[12px] border bg-secondary text-custom-white"
            href={"/explore"}
          >
            Explore
          </Link>
          <Link className="md:flex-1 border bg-white py-[12px]" href={"/login"}>
            Become a Teacher
          </Link>
        </div>
      </div>
      <div className="container container-main mx-auto my-[50px]">
        <div className='border border-gray-light max-w-[350px] mx-auto lg:max-w-[476px] lg:flex lg:border-none xl:max-w-[571px] '>
          <div className='flex justify-between my-[12px] mx-[20px] lg:flex lg:flex-col-reverse xl:pr-[20px]'>
            <span className='leading-[100%] text-secondary text-[20px] xl:text-[24px]'>Teachers</span>
            <span className='text-primary text-[24px] leading-[100%] lg:mb-[5px] lg:text-[26px] lg:text-center xl:text-[32px]'>100+</span>
          </div> <hr className='border-gray-light' />
          <div className='flex justify-between my-[12px] mx-[20px] lg:flex lg:flex-col-reverse lg:border-r lg:border-r-secondary lg:border-l lg:border-l-secondary lg:px-[50px] xl:px-[70px]'>
            <span className='leading-[100%] text-secondary text-[20px] xl:text-[24px]'>Students</span>
            <span className='text-primary text-[24px] leading-[100%] lg:mb-[5px] lg:text-[26px] lg:text-center xl:text-[32px]'>2000+</span>
          </div> <hr className='border-gray-light' />
          <div className='flex justify-between my-[12px] mx-[20px] lg:flex lg:flex-col-reverse xl:pl-[20px]'>
            <span className='leading-[100%] text-secondary text-[20px] xl:text-[24px]'>Groups</span>
            <span className='text-primary text-[24px] leading-[100%] lg:mb-[5px] lg:text-[26px] lg:text-center xl:text-[32px]'>250+</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
