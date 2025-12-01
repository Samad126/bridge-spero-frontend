// src/lib/auth/authEvents.ts

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

export class AuthEventEmitter {
  static dispatch(type: AuthEventType, detail: AuthEventDetail) {
    if (typeof window === "undefined") return;

    const event = new CustomEvent(type, {
      detail,
      bubbles: true,
      cancelable: true,
    });

    dispatchEvent(event);
  }

  static listen(
    type: AuthEventType,
    handler: (event: CustomEvent<AuthEventDetail>) => void
  ) {
    if (typeof window === "undefined") return () => {};

    console.log('[AuthEventEmitter] Listening for event:', type);

    const listener = (event: Event) => {
      handler(event as CustomEvent<AuthEventDetail>);
    };

    addEventListener(type, listener);

    return () => removeEventListener(type, listener);
  }
}
