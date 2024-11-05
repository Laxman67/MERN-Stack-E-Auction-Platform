import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/auctionitem`;

const auctionSlice = createSlice({
  name: 'auction',
  initialState: {
    loading: false,
    itemDetail: {},
    auctionDetail: {},
    auctionBidders: {},
    myAuction: [],
    allAuctions: [],
  },

  reducers: {
    getAllAuctionItemRequest(state) {
      state.loading = true;
    },
    getAllAuctionItemSuccess(state, action) {
      state.loading = true;
      state.allAuctions = action.payload;
    },
    getAllAuctionItemFailed(state) {
      state.loading = false;
    },
    getAuctionDetailRequest(state) {
      state.loading = true;
    },
    getAuctionDetailSuccess(state, action) {
      state.loading = true;
      state.auctionDetail = action.payload.auctionItem;
      state.auctionBidders = action.payload.bidders;
    },
    getAuctionDetailFailed(state) {
      state.loading = false;
      // eslint-disable-next-line no-self-assign
      state.auctionDetail = state.auctionDetail;
      // eslint-disable-next-line no-self-assign
      state.auctionBidders = state.auctionBidders;
    },

    resetSlice(state) {
      state.loading = false;
    },
  },
});

export const getAllAuctionItems = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getAllAuctionItemRequest());

  try {
    const response = await axios.get(`${BACKEND_URL}/allitems`, {
      withCredentials: true,
    });

    dispatch(
      auctionSlice.actions.getAllAuctionItemSuccess(response.data.items)
    );

    dispatch(auctionSlice.actions.resetSlice());
  } catch (error) {
    dispatch(auctionSlice.actions.getAllAuctionItemFailed());
    toast.error(error.response.data.message);
    dispatch(auctionSlice.actions.resetSlice());
  }
};
export const getAuctionDetail = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.getAuctionDetailRequest());

  try {
    const response = await axios.get(`${BACKEND_URL}/auction/${id}`, {
      withCredentials: true,
    });

    dispatch(auctionSlice.actions.getAuctionDetailSuccess(response.data));

    dispatch(auctionSlice.actions.resetSlice());
  } catch (error) {
    dispatch(auctionSlice.actions.getAuctionDetailFailed());
    toast.error(error.response.data.message);
    dispatch(auctionSlice.actions.resetSlice());
  }
};

export default auctionSlice.reducer;
