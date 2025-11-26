import SyllabusCard from "./SyllabusCard"

function Syllabus() {
  return (
    <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
      <SyllabusCard />
      <SyllabusCard />
      <SyllabusCard />
    </div>
  );
}

export default Syllabus;
