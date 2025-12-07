export interface ExploreGroup {
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

export interface ExploreGroupsResponse {
  data: ExploreGroup[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPagesCount: number;
}

export interface ExploreGroupsFilters {
  groupName?: string;
  language?: string;
  pageNumber?: number;
  pageSize?: number;
}

