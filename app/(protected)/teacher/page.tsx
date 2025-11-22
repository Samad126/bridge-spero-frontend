import WelcomeBack from "@/features/dashboard/teacher/welcomeBack/WelcomeBack";
import TodaysEvents from "@/features/dashboard/teacher/events/TodaysEvents";
import Schedule from "@/features/common/components/Schedule/Shedule";

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
