import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { FEED_SLICE_NAME } from '../../utils/constants';

export const getFeedThunk = createAsyncThunk<TOrdersData>(
  `${FEED_SLICE_NAME}/getFeed`,
  async () => getFeedsApi()
);

interface FeedState {
  isLoading: boolean;
  feed: TOrdersData;
}

const initialState: FeedState = {
  isLoading: false,
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    selectFeed: (sliceState: FeedState) => sliceState.feed,
    selectOrdersFeed: (sliceState: FeedState) => sliceState.feed.orders,
    selectLoadFeed: (sliceState: FeedState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        getFeedThunk.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.isLoading = false;
          state.feed = action.payload;
        }
      );
  }
});

export const { selectFeed, selectOrdersFeed, selectLoadFeed } =
  feedSlice.selectors;
