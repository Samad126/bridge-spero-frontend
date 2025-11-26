export type ScheduleType = {
  id: number;
  day: string;
  lessons: LessonType[];
};

export type LessonType = {
  id: number;
  subject: string;
  teacher: string;
  time: string;
};