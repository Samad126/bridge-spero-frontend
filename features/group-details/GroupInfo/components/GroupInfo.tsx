import Tabs from "../../Tabs/components/Tabs";
import GroupLevel from "./GroupLevel";
import GroupMetadata from "./GroupMetadata";
import PricingCard from "./PricingCard";
import TeacherCard from "./TeacherCard";
import { GroupDetails } from "../../types/groupDetailsTypes";
import JitsiPricingCard from "./JitsiPricingCard";

interface GroupInfoProps {
  group: GroupDetails;
  groupId: string;
  isAuthenticated: boolean;
}

function GroupInfo({ group, groupId, isAuthenticated }: GroupInfoProps) {
  return (
    <section>
      <div className="container flex gap-[80px] items-start">
        <div className="w-full">
          <GroupLevel category={group.category} language={group.language} />
          <h2 className="text-center text-primary text-[32px] leading-[130%] font-normal tracking-[0%] xxl:text-[54px] xxl:text-left">
            {group.name}
          </h2>
          <p className="my-[32px] text-center text-secondary leading-[140%] xxl:text-[20px] xxl:my-[24px] xxl:text-left">
            {group.description}
          </p>
          <GroupMetadata
            duration={group.durationInWeeks}
            currentStudents={group.activeStudents}
            maxStudents={group.maxStudents}
            startDate={group.startDate}
          />

          <TeacherCard
            name={`${group.teacher.name} ${group.teacher.surname}`}
            profilePicture={group.teacher.profilePictureName}
            rating={group.teacher.rating}
            activeStudents={group.teacher.activeStudents}
            teacherId={group.teacher.id}
          />
          <Tabs
            groupId={groupId}
            isAuthenticated={isAuthenticated}
            teacherId={group.teacher.id}
          />
        </div>
        <JitsiPricingCard
          price={group.price}
          groupId={groupId}
          teacherId={group.teacher.id}
          imageUrl={group.imageUrl}
        />
      </div>
    </section>
  );
}

export default GroupInfo;
