import MemberItem from "./MemberItem";

function MemberList() {
  return (
    <div>
      <input
        type="text"
        className="mt-[24px] mb-[12px] border border-gray-light h-[46px] px-[12px] w-full outline-0 inline-block placeholder:text-tertiary"
        placeholder="Search members"
      />
      <div className="max-h-[530px] overflow-y-auto border border-gray-light">
        <MemberItem />
        <MemberItem />
        <MemberItem />
        <MemberItem />
        <MemberItem />
        <MemberItem />
        <MemberItem />
        <MemberItem />
        <MemberItem />
        <MemberItem />
        <MemberItem />
        <MemberItem />
        <MemberItem />
      </div>
    </div>
  );
}

export default MemberList;
