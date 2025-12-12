export interface TeacherDashboardEvent {
  id: number;
  groupId: number;
  name: string;
  status: string;
  startTime: string;
  numberOfStudents: number;
  maxStudents: number;
  startUrl: string;
  isMeetingActive: boolean;
}

export interface TeacherDashboardResponse {
  name: string;
  activeGroups: number;
  activeStudents: number;
  totalEarning: number | null;
  rating: number | null;
  events: TeacherDashboardEvent[];
}

export interface TeacherScheduleGroup {
  id: number;
  groupName: string;
  time: string;
}

export interface TeacherScheduleDay {
  dayOfWeek: string;
  groups: TeacherScheduleGroup[];
}

export interface TeacherScheduleResponse {
  date: string;
  schedule: TeacherScheduleDay[];
}

