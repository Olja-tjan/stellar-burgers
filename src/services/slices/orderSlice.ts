import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TOrder } from '@utils-types';

export const orderBurgerThunk = createAsyncThunk(
  'orders/orderBurger',
  async (id_ingredients: string[]) => orderBurgerApi(id_ingredients) // post ingredients to order, принимает массив с id
)

export const getOrderByIdThunk = createAsyncThunk(
  'orders/getOrderByNumber',
  async (id_order: number) => getOrderByNumberApi(id_order) // get order по id-заказа
)

interface OrderState {
  isLoading: boolean,
  order:  TOrder | null
}

const initialState: OrderState = {
  isLoading: false,
  order: null
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectLoadOrder: (sliceState: OrderState) => sliceState.isLoading,
    selectOrder: (sliceState: OrderState) => sliceState.order
  },
  extraReducers: (builder) => {
    builder
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

export const { selectLoadOrder, selectOrder } = orderSlice.selectors;

export default orderSlice.reducer;
