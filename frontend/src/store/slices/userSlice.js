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
