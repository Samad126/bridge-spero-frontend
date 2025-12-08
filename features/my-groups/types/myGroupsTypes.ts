export interface MyGroup {
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

export type MyGroupsResponse = MyGroup[];

export interface MyGroupsFilters {
  groupName?: string;
  language?: string;
  status?: string;
  categoryId?: string;
}

export interface Category {
  id: number;
  name: string;
}

export type CategoriesResponse = Category[] | { data: Category[] };
