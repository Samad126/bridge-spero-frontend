import WeekDay from "./WeekDay";

function Shedule() {
  return (
    <section className="mt-[40px]">
      <div className="container">
        <div className="flex flex-col gap-[32px] items-center justify-between mb-[32px] xxl:mb-[12px] xxl:flex-row">
          <h2 className="text-primary text-[32px] leading-[100%] font-normal">
            Schedule
          </h2>
          <p className="text-secondary text-[24px]">01.02.2025 - 07.02.2025</p>
        </div>
        <div className="flex space-x-[12px] p-[24px] border border-gray-light">
          <WeekDay />
          <WeekDay />
          <WeekDay />
          <WeekDay />
          <WeekDay />
          <WeekDay />
          <WeekDay />
        </div>
      </div>
    </section>
  );
}

export default Shedule;
