import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TOrdersData } from '@utils-types';

export const getFeedThunk = createAsyncThunk(
  'feed/getFeed',
  async () => getFeedsApi()
)

interface FeedState {
  isLoading: boolean,
  error: unknown | null,
  feed: TOrdersData
  // orders: TOrder[],
  // total: number,
  // totalToday: number
}

const initialState: FeedState = {
  isLoading: false,
  error: null,
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  }
}

const ordersSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeed: (sliceState: FeedState) => sliceState.feed,    
    selectOrdersFeed: (sliceState: FeedState) => sliceState.feed.orders
  },
  extraReducers: (builder) => {
    builder
    .addCase(getFeedThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getFeedThunk.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getFeedThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feed = action.payload
    })
  }
})

export const { selectFeed, selectOrdersFeed } = ordersSlice.selectors;

export default ordersSlice.reducer;
