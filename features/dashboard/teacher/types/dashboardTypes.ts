export interface TeacherDashboardGroup {
  id: number;
  name: string;
  status: string;
  startTime: string;
  numberOfStudents: number;
  maxStudents: number;
  minStudents: number;
  startUrl: string;
  isMeetingActive: boolean;
}

export interface TeacherDashboardResponse {
  name: string;
  activeGroups: number;
  activeStudents: number;
  totalEarning: number;
  rating: number;
  groups: TeacherDashboardGroup[];
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

