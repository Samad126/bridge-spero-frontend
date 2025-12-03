export interface TrendingTeacher {
  id: number;
  profilePictureName: string;
  name: string;
  surname: string;
  rating: number;
  activeStudents: number;
}

export interface TrendingTeachersResponse {
  data: TrendingTeacher[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPagesCount: number;
}

