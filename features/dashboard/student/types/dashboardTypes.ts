export interface DashboardGroup {
  id: number;
  teacherId: number;
  name: string;
  status: string;
  startTime: string;
  teacher: string;
  joinUrl: string;
  isMeetingActive: boolean;
}

export interface DashboardResponse {
  name: string;
  activeGroups: number;
  studyHours: number;
  lessonsToday: number;
  groups: DashboardGroup[];
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

