// src/components/AuthWrapper.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { setSessionExpiredPopup } from "@/features/auth/slices/authSlice";
import { AuthEventEmitter } from "../lib/authEvents";
import { useAppDispatch } from "@/lib/redux/hooks";
import { AuthEventType } from "../types/authTypes";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const hasListenersRef = useRef(false);

  useEffect(() => {
    if (hasListenersRef.current) return;
    hasListenersRef.current = true;

    // Handle redirect to login (strict mode)
    const unsubscribeRedirect = AuthEventEmitter.listen(
      AuthEventType.REDIRECT_TO_LOGIN,
      (event) => {
        const { detail } = event;
        console.log("[AuthWrapper] Redirecting to login:", detail);

        // Store the current path to redirect back after login
        const currentPath = window.location.pathname;
        if (currentPath !== "/login") {
          sessionStorage.setItem("redirectAfterLogin", currentPath);
        }

        router.push("/login");
      }
    );

    // Handle session expired (optional mode)
    const unsubscribeSessionExpired = AuthEventEmitter.listen(
      AuthEventType.SESSION_EXPIRED,
      (event) => {
        const { detail } = event;
        console.log("[AuthWrapper] Session expired:", detail);

        dispatch(setSessionExpiredPopup(true));
      }
    );

    // Handle auth success (optional: for logging or analytics)
    const unsubscribeSuccess = AuthEventEmitter.listen(
      AuthEventType.AUTH_SUCCESS,
      (event) => {
        const { detail } = event;
        console.log("[AuthWrapper] Auth success:", detail);

        // You can add analytics tracking here
        // analytics.track('auth_refresh_success', detail);
      }
    );

    // Cleanup
    return () => {
      unsubscribeRedirect();
      unsubscribeSessionExpired();
      unsubscribeSuccess();
      hasListenersRef.current = false;
    };
  }, [router, dispatch]);

  return <>{children}</>;
}
