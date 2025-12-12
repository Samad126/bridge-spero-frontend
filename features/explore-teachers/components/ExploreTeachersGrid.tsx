import TeacherCard from "@/features/common/teachers/components/TeacherCard";
import { fetchExploreTeachers } from "../api/fetchExploreTeachers";

interface ExploreTeachersGridProps {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
}

export default async function ExploreTeachersGrid({
  name,
  pageNumber = 0,
  pageSize = 10,
}: ExploreTeachersGridProps) {
  const response = await fetchExploreTeachers({
    name,
    pageNumber,
    pageSize,
  });

  const teachers = response.data;

  if (teachers.length === 0) {
    return (
      <div className="text-center py-[60px]">
        <p className="text-secondary text-[18px]">
          No teachers found. Try adjusting your search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-[12px] mb-[32px] lg:grid-cols-3 lg:mb-[42px] xxl:grid-cols-4">
      {teachers.map((teacher) => (
        <TeacherCard
          key={teacher.id}
          id={teacher.id}
          experience={`${teacher.activeStudents} students`}
          name={`${teacher.name} ${teacher.surname}`}
          profileUrl={teacher.profilePictureName}
          star={teacher.rating}
          col={2}
        />
      ))}
    </div>
  );
}

