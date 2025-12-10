import { configureStore } from '@reduxjs/toolkit';
import authReducer, { logout } from '@/features/auth/slices/authSlice';
import { baseApi } from './baseApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware).prepend((store) => (next) => (action) => {
        // Reset RTK Query cache when logout action is dispatched
        if (logout.match(action)) {
          // Use resetApiState to completely clear all cache
          // This is necessary because invalidateTags only works with active subscriptions
          store.dispatch(baseApi.util.resetApiState());
        }
        return next(action);
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];