// src/lib/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import {
  logout,
  setAuthenticated,
  setRefreshing,
} from "@/features/auth/slices/authSlice";
import {
  AuthEventEmitter,
  AuthEventType,
} from "@/features/auth/lib/authEvents";

const mutex = new Mutex();

export type AuthMode = "strict" | "optional";

interface CustomFetchArgs extends FetchArgs {
  meta?: {
    authMode?: AuthMode;
  };
}

const shouldGoDirectToBackend = (url: string): boolean => {
  const directEndpoints = ["/auth/login", "/auth/register", "/auth/logout"];
  return directEndpoints.some((endpoint) => url.includes(endpoint));
};

const dynamicBaseQuery = fetchBaseQuery({
  baseUrl: "/",
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQuery: BaseQueryFn<
  string | CustomFetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let adjustedArgs: CustomFetchArgs;

  if (typeof args === "string") {
    adjustedArgs = { url: args };
  } else {
    adjustedArgs = { ...args };
  }

  if (shouldGoDirectToBackend(adjustedArgs.url)) {
    adjustedArgs.url = `${process.env.NEXT_PUBLIC_API_URL}${adjustedArgs.url}`;
  } else {
    adjustedArgs.url = `/api/proxy${adjustedArgs.url}`;
  }

  return dynamicBaseQuery(adjustedArgs, api, extraOptions);
};

const baseQueryWithReauth: BaseQueryFn<
  string | CustomFetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  console.log("Result from baseApi.ts is ", result);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        // Get authMode from the request meta
        const authMode: AuthMode =
          typeof args !== "string" && args.meta?.authMode
            ? args.meta.authMode
            : "strict"; // Default to strict if not specified

        api.dispatch(setRefreshing(true));

        const refreshResult = await baseQuery(
          {
            url: "/refresh",
            method: "POST",
          },
          api,
          extraOptions
        );

        console.log(refreshResult);

        if (refreshResult.data) {
          // Token refresh successful
          api.dispatch(setAuthenticated(true));

          // Dispatch success event
          AuthEventEmitter.dispatch(AuthEventType.AUTH_SUCCESS, {
            mode: authMode,
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

// const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 3 });

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Dashboard", "User", "Zoom"],
  endpoints: () => ({}),
});
