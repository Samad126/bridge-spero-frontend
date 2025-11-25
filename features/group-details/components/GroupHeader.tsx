import GroupLevel from "./GroupLevel";
import GroupMetadata from "./GroupMetadata";
import PricingCard from "./PricingCard";
import TeacherCard from "./TeacherCard";

function GroupHeader() {
  return (
    <section>
      <div className="container flex gap-[80px] items-start">
        <div>
          <GroupLevel />
          <h2 className="text-center text-primary text-[32px] leading-[130%] font-normal tracking-[0%] xxl:text-[54px] xxl:text-left">
            Advanced Mathematics
          </h2>
          <p className="my-[32px] text-center text-secondary leading-[140%] xxl:text-[20px] xxl:my-[24px] xxl:text-left">
            Dive deep into the world of Advanced Mathematics — where logic meets
            creativity. This course covers complex topics like calculus, linear
            algebra, and differential equations, helping you build strong
            problem-solving skills for higher studies or research.
          </p>
          <GroupMetadata />

          <TeacherCard />
        </div>
        <PricingCard />
      </div>
    </section>
  );
}

export default GroupHeader;
