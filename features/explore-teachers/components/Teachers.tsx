import ExploreTeachersWrapper from "./ExploreTeachersWrapper";

interface TeachersProps {
  searchParams: {
    name?: string;
    pageNumber?: string;
    pageSize?: string;
  };
}

function Teachers({ searchParams }: TeachersProps) {
  // Create a key from searchParams to force remount on change
  const key = JSON.stringify(searchParams);

  return (
    <div>
      <div className="container">
        <ExploreTeachersWrapper key={key} searchParams={searchParams} />
      </div>
    </div>
  );
}

export default Teachers;
