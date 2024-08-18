import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { ORDERS_SLICE_NAME } from '../../utils/constants';

export const getOrdersThunk = createAsyncThunk(
  `${ORDERS_SLICE_NAME}/getOrders`,
  async () => getOrdersApi()
);

interface OrdersState {
  isLoading: boolean;
  orders: TOrder[];
}

const initialState: OrdersState = {
  isLoading: false,
  orders: []
};

export const ordersSlice = createSlice({
  name: ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (sliceState: OrdersState) => sliceState.orders,
    selectLoadOrders: (sliceState: OrdersState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        getOrdersThunk.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      );
  }
});

export const { selectOrders } = ordersSlice.selectors;
