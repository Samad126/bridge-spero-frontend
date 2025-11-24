import TeacherCard from "./TeacherCard";
import { TeacherCardItem } from "../../homepageTypes";

interface TeacherListProps {
  teachers: TeacherCardItem[];
  col?: 1 | 2;
  hideLastCard?: boolean;
}

function TeacherList({ teachers, col = 1, hideLastCard = true }: TeacherListProps) {
  const gridColsClass = col === 1 ? "grid-cols-1" : "grid-cols-2";
  const lastCardClass = hideLastCard
    ? "[&>*:last-child]:hidden xxl:[&>*:last-child]:block"
    : "";

  return (
    <div className={`grid ${gridColsClass} gap-[12px] mb-[32px] lg:grid-cols-3 lg:mb-[42px] ${lastCardClass} xxl:grid-cols-4`}>
      {teachers.map((teacher) => (
        <TeacherCard
          experience={teacher.experience}
          name={teacher.name}
          profileUrl={teacher.profileUrl}
          star={teacher.star}
          col={col}
          key={teacher.id}
        />
      ))}
    </div>
  );
}

export default TeacherList;

