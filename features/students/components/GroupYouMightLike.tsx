import Link from "next/link";
import GroupList from "../../common/groups/components/GroupList/GroupList";
import { demoGroups } from "../../common/groups/constants/demoGroups";

function GroupYouMightLike() {
  return (
    <section>
      <div className="container">
        <h2 className="text-center text-primary text-[32px] leading-[130%] lg:text-[48px] xxl:text-[54px]">
          Groups You Might Like
        </h2>
        <p className="text-center text-secondary mx-auto max-w-[326px] mt-[16px] mb-[32px] lg:mb-[42px] lg:text-[18px] lg:max-w-[351px] xxl:text-[20px]">
          Learn the skills everyone&apos;s talking about with our trending
          courses
        </p>

        <GroupList demoGroups={demoGroups} />
        <Link
          href={"/"}
          className="border mt-[15px] py-[12px] w-[200px] mx-auto block text-center border-secondary text-secondary"
        >
          More
        </Link>
      </div>
    </section>
  );
}

export default GroupYouMightLike;
