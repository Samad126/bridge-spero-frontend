import ExploreGroupsWrapper from "./ExploreGroupsWrapper";

interface GroupsProps {
  searchParams: {
    groupName?: string;
    language?: string;
    pageNumber?: string;
    pageSize?: string;
  };
}

function Groups({ searchParams }: GroupsProps) {
  // Create a key from searchParams to force remount on change
  const key = JSON.stringify(searchParams);

  return (
    <div>
      <div className="container">
        <ExploreGroupsWrapper key={key} searchParams={searchParams} />
      </div>
    </div>
  );
}

export default Groups;
