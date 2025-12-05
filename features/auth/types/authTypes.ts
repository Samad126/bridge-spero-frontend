export enum AuthEventType {
  REDIRECT_TO_LOGIN = "auth:redirect-to-login",
  SESSION_EXPIRED = "auth:session-expired",
  AUTH_SUCCESS = "auth:success",
  AUTH_FAILED = "auth:failed",
}

export interface AuthEventDetail {
  mode: "strict" | "optional";
  reason?: string;
  timestamp: number;
}

export type JWTPayload = {
  sub: string;
  id: number;
  token_type: "ACCESS" | "REFRESH";
  auth: "ROLE_TEACHER" | "ROLE_STUDENT";
  full_name: string;
  role: "TEACHER" | "STUDENT";
  exp: number;
};
