import MyGroupsWrapper from "./MyGroupsWrapper";

interface GroupsProps {
  searchParams: {
    groupName?: string;
    language?: string;
    status?: string;
    categoryId?: string;
  };
}

function Groups({ searchParams }: GroupsProps) {
  const key = JSON.stringify(searchParams);

  return (
    <div>
      <div className="container">
        <MyGroupsWrapper key={key} searchParams={searchParams} />
      </div>
    </div>
  );
}

export default Groups;
