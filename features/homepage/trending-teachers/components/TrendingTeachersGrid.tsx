import TeacherCard from "@/features/common/teachers/components/TeacherCard";
import { fetchTrendingTeachers } from "../api/fetchTrendingTeachers";

interface TrendingTeachersGridProps {
  col?: 1 | 2;
  hideLastCard?: boolean;
}

export default async function TrendingTeachersGrid({ 
  col = 1, 
  hideLastCard = true 
}: TrendingTeachersGridProps) {
  const response = await fetchTrendingTeachers(0, 4);
  const teachers = response.data;

  const gridColsClass = col === 1 ? "grid-cols-1" : "grid-cols-2";
  const lastCardClass = hideLastCard
    ? "[&>*:nth-child(4)]:hidden xxl:[&>*:nth-child(4)]:block"
    : "";

  return (
    <div className={`grid ${gridColsClass} gap-[12px] mb-[32px] lg:grid-cols-3 lg:mb-[42px] ${lastCardClass} xxl:grid-cols-4`}>
      {teachers.map((teacher) => (
        <TeacherCard
          key={teacher.id}
          id={teacher.id}
          experience={`${teacher.activeStudents} students`}
          name={`${teacher.name} ${teacher.surname}`}
          profileUrl={teacher.profilePictureName}
          star={teacher.rating}
          col={col}
        />
      ))}
    </div>
  );
}

