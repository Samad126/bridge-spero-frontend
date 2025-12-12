export interface DashboardEvent {
  id: number;
  groupId: number;
  name: string;
  status: string;
  startTime: string;
  endTime?: string;
  numberOfStudents: number;
  maxStudents: number;
  startUrl: string;
  isMeetingActive: boolean;
  teacher?: string;
  joinUrl?: string;
}

export interface DashboardResponse {
  name: string;
  activeGroups: number;
  activeStudents?: number;
  studyHours?: number;
  lessonsToday?: number;
  events: DashboardEvent[];
}

export interface ScheduleGroup {
  id: number;
  groupName: string;
  time: string;
}

export interface ScheduleDay {
  dayOfWeek: string;
  groups: ScheduleGroup[];
}

export interface ScheduleResponse {
  date: string;
  schedule: ScheduleDay[];
}

