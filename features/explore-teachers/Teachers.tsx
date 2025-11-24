import TeacherList from "../homepage/components/TrendingTeachers/TeacherList";
import { demoTeachersMultiple } from "../homepage/demoTeachers";

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
