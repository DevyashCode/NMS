import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode"; 
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN } from "../../token";


// --- Async Thunks ---

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { dispatch, rejectWithValue }) => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    if (!refresh) {
      dispatch(logout());
      return rejectWithValue("No refresh token found");
    }

    try {
      const res = await api.post("/api/token/refresh/", { refresh });
      if (res.status === 200 && res.data.access) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        const decoded = jwtDecode(res.data.access);

        dispatch(setAuthorized(true));
        console.log("From refreshToken Function!!!!!!!!!!!!!!!");
        console.log(decoded);
        dispatch(setUser(decoded));
        return true;
      }
      return rejectWithValue("Failed to refresh token");
    } catch (error) {
      dispatch(logout());
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { dispatch }) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
          await dispatch(refreshToken());
        } else {
          dispatch(setAuthorized(true));
          console.log("From Check Auth!!!!!!!!");
          dispatch(setUser(decoded));
        }
      } catch (error) {
        dispatch(logout());
      }
    } else if (googleAccessToken) {
      try {
        const res = await api.post("/api/google/validate_token/", {
          access_token: googleAccessToken,
        });

        if (res.data.valid) {
          dispatch(setAuthorized(true));
          // console.log("Response Google Validate Token",res);
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      let res;

      if (credentials.google_token) {
        res = await api.post("/api/google/login/", {
          access_token: credentials.google_token,
        });
      } else {
        res = await api.post("/api/token/", credentials);
      }

      // Save tokens
      if (res.data.access) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
      }
      if (res.data.refresh) {
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      }

      await dispatch(checkAuth());
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// --- Slice ---

const initialState = {
  isAuthorized: false,
  user: null,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthorized = false;
      state.user = null;
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(GOOGLE_ACCESS_TOKEN);
    },
  },
});

export const { setAuthorized, setUser, logout } = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;

// --- Selectors ---
export const IsAuthorisedSelector = (state) => state.Auth.isAuthorized;
export const UserSelector = (state) => state.Auth.user;
