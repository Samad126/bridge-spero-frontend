export interface ExploreTeacher {
  id: number;
  profilePictureName: string;
  name: string;
  surname: string;
  rating: number;
  activeStudents: number;
}

export interface ExploreTeachersResponse {
  data: ExploreTeacher[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPagesCount: number;
}

export interface ExploreTeachersFilters {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
}

