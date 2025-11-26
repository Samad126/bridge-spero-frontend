import Schedule from "@/features/common/schedule/components/Schedule";
import StudentTodaysEvents from "@/features/dashboard/student/events/components/StudentTodaysEvents";
import WelcomeBack from "@/features/dashboard/student/welcome-back/components/WelcomeBack";
import GroupYouMightLike from "@/features/students/components/GroupYouMightLike";

function page() {
  return (
    <>
      <WelcomeBack />
      <StudentTodaysEvents />
      <Schedule />
      <GroupYouMightLike />
    </>
  );
}

export default page;