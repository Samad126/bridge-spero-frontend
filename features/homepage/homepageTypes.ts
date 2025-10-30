export type TeacherCardItem = {
  id?: number;
  profileUrl: string;
  name: string;
  star: number;
  experience: string;
};


export type GroupCardItem = {
  id?: number,
  imageUrl: string,
  degree: string, 
  language: string,
  subjectName: string,
  teacherName: string,
  price: number
};