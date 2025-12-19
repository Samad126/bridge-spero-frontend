export interface JoinNotification {
  id: number;
  studentName: string;
  studentsSurname: string;
  groupName: string;
}

export type JoinNotificationsResponse = JoinNotification[];

export type MembershipStatus = "MEMBER" | "NOT_MEMBER" | "PENDING";
