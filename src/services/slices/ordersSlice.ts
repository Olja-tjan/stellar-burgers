import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TOrder } from '@utils-types';

export const getOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  async () => getOrdersApi() // get orders
)

interface OrdersState {
  isLoading: boolean,
  orders: TOrder[]
}

const initialState: OrdersState = {
  isLoading: false,
  orders: [],
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectLoadOrders: (sliceState: OrdersState) => sliceState.isLoading,
    selectOrders: (sliceState: OrdersState) => sliceState.orders
  },
  extraReducers: (builder) => {
    builder
    // Получение массива orders
    .addCase(getOrdersThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getOrdersThunk.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload
    })
  }
})

export const { selectOrders } = ordersSlice.selectors;

export default ordersSlice.reducer;
