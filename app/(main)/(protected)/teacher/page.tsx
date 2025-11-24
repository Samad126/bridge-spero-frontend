import Schedule from "@/features/common/schedule/components/Schedule";
import TodaysEvents from "@/features/dashboard/teacher/events/components/TodaysEvents";
import WelcomeBack from "@/features/dashboard/teacher/welcome-back/components/WelcomeBack";

function page() {
  return (
    <>
      <WelcomeBack />
      <TodaysEvents />
      <Schedule />
    </>
  );
}

export default page;
