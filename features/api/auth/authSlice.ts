// src/lib/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthMode = "strict" | "optional";

interface AuthState {
  isAuthenticated: boolean;
  isRefreshing: boolean;
  sessionExpiredPopup: boolean;
  authMode: AuthMode | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isRefreshing: false,
  sessionExpiredPopup: false,
  authMode: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
    setSessionExpiredPopup: (state, action: PayloadAction<boolean>) => {
      state.sessionExpiredPopup = action.payload;
    },
    setAuthMode: (state, action: PayloadAction<AuthMode>) => {
      state.authMode = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authMode = null;
      state.sessionExpiredPopup = false;
    },
  },
});

export const {
  setAuthenticated,
  setRefreshing,
  setSessionExpiredPopup,
  setAuthMode,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
