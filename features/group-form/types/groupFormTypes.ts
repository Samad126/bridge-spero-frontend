export enum Language {
  AZERBAIJANI = "AZERBAIJANI",
  ENGLISH = "ENGLISH",
  RUSSIAN = "RUSSIAN",
  TURKISH = "TURKISH",
}

export interface ScheduleEntry {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface CreateGroupPayload {
  name: string;
  categoryId: number;
  language: Language;
  startDate: string;
  durationInMonths: number;
  maxStudents: number;
  price: number;
  description?: string;
  groupImage?: File;
  syllabus?: File;
}

export interface CreateGroupResponse {
  id: number;
  name: string;
  category: string;
  language: string;
  startDate: string;
  durationInWeeks: number;
  maxStudents: number;
  activeStudents: number;
  price: number;
  status?: string;
  imageUrl?: string;
  description: string | null;
  teacher?: {
    id: number;
    profilePictureName: string | null;
    name: string;
    surname: string;
    rating: number | null;
    activeStudents: number;
  };
}

