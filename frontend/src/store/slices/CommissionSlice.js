import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/commission`;

const CommissionSlice = createSlice({
  name: 'commission',
  initialState: {
    loading: false,
  },
  reducers: {
    postCommissionProofRequest(state) {
      state.loading = true;
    },
    postCommissionProofSuccess(state) {
      state.loading = false;
    },
    postCommissionProofFailed(state) {
      state.loading = false;
    },
  },
});

export const postCommissionProof = (data) => async (dispatch) => {
  dispatch(CommissionSlice.actions.postCommissionProofRequest());
  try {
    const response = await axios.post(`${BACKEND_URL}/proof`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    dispatch(CommissionSlice.actions.postCommissionProofSuccess());
    toast.success(response.data.message);
    dispatch(CommissionSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(CommissionSlice.actions.postCommissionProofFailed());
    toast.error(error.response.data.message);
    dispatch(CommissionSlice.actions.clearAllErrors());
  }
};

export default CommissionSlice.reducer;
