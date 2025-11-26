import ResourcesCard from "./ResourcesCard";

function Resources() {
  return (
    <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
      <ResourcesCard cardStatus="view-edit" />
      <ResourcesCard cardStatus="view-edit" />
      <ResourcesCard cardStatus="add" />
    </div>
  );
}

export default Resources