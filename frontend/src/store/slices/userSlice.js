import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/user`;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
    },

    logoutFailed(state) {
      state.loading = false;
    },
    clearAllErrors(state) {
      state.loading = false;
      //   keep same all rest
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(`${BACKEND_URL}/register`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};
export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(`${BACKEND_URL}/login`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });

    dispatch(userSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};
export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/logout`, {
      withCredentials: true,
    });

    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export default userSlice.reducer;
