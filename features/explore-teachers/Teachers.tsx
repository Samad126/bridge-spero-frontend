import TeacherList from "../common/components/TeacherList/TeacherList";
import { demoTeachersMultiple } from "../common/constants/demoTeachers";

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
