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
  imageUrl?: string;
  teacher: Teacher;
}

// Backend returns the data directly, not wrapped in a data property
export type GroupDetailsResponse = GroupDetails;

export interface IsMemberResponse {
  isMember: boolean;
}

export interface ScheduleItem {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export type ScheduleResponse = ScheduleItem[];

export interface CreateScheduleRequest {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface UpdateScheduleRequest {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export type SyllabusResponse = string;

export interface RecordingItem {
  id: number;
  name: string;
  path: string;
  contentType: string;
  createdAt: string;
}

export type RecordingsResponse = RecordingItem[];

export interface ResourceItem {
  id: number;
  name: string;
  path: string;
  contentType: string;
  createdAt: string;
}

export type ResourcesResponse = ResourceItem[];

export interface MemberStudent {
  id: number;
  name: string;
  surname: string;
}

export interface MembersResponse {
  count: number;
  students: MemberStudent[];
}

