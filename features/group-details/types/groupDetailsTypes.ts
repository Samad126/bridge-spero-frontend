export interface Teacher {
  id: number;
  profilePictureName: string;
  name: string;
  surname: string;
  rating: number;
  activeStudents: number;
}

export interface GroupDetails {
  name: string;
  category: string;
  language: string;
  description: string;
  durationInWeeks: number;
  activeStudents: number;
  maxStudents: number;
  startDate: string;
  price: number;
  teacher: Teacher;
}

// Backend returns the data directly, not wrapped in a data property
export type GroupDetailsResponse = GroupDetails;

export interface IsJoinedResponse {
  isJoined: boolean;
}

