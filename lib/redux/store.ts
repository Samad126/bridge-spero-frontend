import { configureStore, combineReducers, UnknownAction } from '@reduxjs/toolkit';
import authReducer, { logout } from '@/features/auth/slices/authSlice';
import { baseApi } from './baseApi';

const appReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
});

// Root reducer that resets the entire state on logout
const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: UnknownAction) => {
  if (logout.match(action)) {
    // Return undefined to reset the entire Redux state
    // This forces all reducers to return their initial state
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];