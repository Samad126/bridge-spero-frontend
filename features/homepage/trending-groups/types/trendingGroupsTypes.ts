export interface TrendingGroup {
  id: number;
  teacherId: number;
  imageUrl: string;
  category: string;
  language: string;
  name: string;
  teacherName: string;
  teacherSurname: string;
  price: number;
}

export interface TrendingGroupsResponse {
  data: TrendingGroup[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPagesCount: number;
}

