import LessonCard from "./LessonCard";

function WeekDay() {
  return (
    <div className="pt-[8px] flex-1">
      <h3 className="text-center mb-[24px] text-[24px]">Monday</h3>
      <div className="flex flex-col gap-[12px]">
        <LessonCard />
        <LessonCard />
        <LessonCard />
      </div>
    </div>
  );
}

export default WeekDay;
