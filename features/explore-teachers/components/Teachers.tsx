import TeacherList from "@/features/common/teachers/components/TeacherList/TeacherList";
import { demoTeachersMultiple } from "@/features/common/teachers/constants/demoTeachers";

function Teachers() {
  return (
    <div>
      <div className="container">
        <TeacherList
          teachers={demoTeachersMultiple}
          col={2}
          hideLastCard={false}
        />
      </div>
    </div>
  );
}

export default Teachers;
