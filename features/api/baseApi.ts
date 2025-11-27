// src/lib/api/baseApi.ts
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { AuthEventEmitter, AuthEventType } from "../auth/lib/authEvents";
import { RootState } from "./store";
import { logout, setAuthenticated, setRefreshing } from "./auth/authSlice";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const state = api.getState() as RootState;
        const authMode = state.auth.authMode;

        api.dispatch(setRefreshing(true));

        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Token refresh successful
          api.dispatch(setAuthenticated(true));

          // Dispatch success event
          AuthEventEmitter.dispatch(AuthEventType.AUTH_SUCCESS, {
            mode: authMode || "strict",
            timestamp: Date.now(),
          });

          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh failed - dispatch appropriate event
          api.dispatch(setAuthenticated(false));

          if (authMode === "strict") {
            // Dispatch redirect event
            AuthEventEmitter.dispatch(AuthEventType.REDIRECT_TO_LOGIN, {
              mode: "strict",
              reason: "Token refresh failed",
              timestamp: Date.now(),
            });

            api.dispatch(logout());
          } else if (authMode === "optional") {
            // Dispatch session expired event
            AuthEventEmitter.dispatch(AuthEventType.SESSION_EXPIRED, {
              mode: "optional",
              reason: "Token refresh failed",
              timestamp: Date.now(),
            });
          }
        }
      } finally {
        api.dispatch(setRefreshing(false));
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 3 });

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Dashboard", "User", "Zoom"],
  endpoints: () => ({}),
});
