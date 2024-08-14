import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TOrder } from '@utils-types';

export const getOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  async () => getOrdersApi() // get orders
)

export const orderBurgerThunk = createAsyncThunk(
  'orders/orderBurger',
  async (id_ingredients: string[]) => orderBurgerApi(id_ingredients) // post ingredients to order, принимает массив с id
)

export const getOrderByIdThunk = createAsyncThunk(
  'orders/getOrderByNumber',
  async (id_order: number) => getOrderByNumberApi(id_order) // get order по id-заказа
)

interface OrdersState {
  isLoading: boolean,
  orders: TOrder[],
  order:  TOrder | null
}

const initialState: OrdersState = {
  isLoading: false,
  orders: [],
  order: null
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectLoadOrders: (sliceState) => sliceState.isLoading,
    selectOrders: (sliceState) => sliceState.orders,
    selectOrder: (sliceState) => sliceState.order
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

    // Отправка массива с id заказанных ингридиентов
    .addCase(orderBurgerThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(orderBurgerThunk.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(orderBurgerThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload.order
    })

    // Получение order по его id
    .addCase(getOrderByIdThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getOrderByIdThunk.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload.orders[0]
    })
  }
})

export const { selectLoadOrders, selectOrders, selectOrder } = ordersSlice.selectors;

export default ordersSlice.reducer;
