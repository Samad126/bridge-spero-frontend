import Schedule from "@/features/common/schedule/components/Schedule/Shedule";
import TodaysEvents from "@/features/dashboard/components/teacher/events/TodaysEvents";
import WelcomeBack from "@/features/dashboard/components/teacher/welcomeBack/WelcomeBack";

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
