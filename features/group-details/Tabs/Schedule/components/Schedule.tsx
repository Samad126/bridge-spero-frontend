import ScheduleCard from "./ScheduleCard";

function Schedule() {
  return (
    <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
      <ScheduleCard cardStatus="teacher-view" />
      <ScheduleCard cardStatus="student-view" />
      <ScheduleCard cardStatus="add" />
    </div>
  );
}

export default Schedule;
