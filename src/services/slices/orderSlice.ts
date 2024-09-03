import {
  getOrderByNumberApi,
  orderBurgerApi,
  TNewOrderResponse,
  TOrderResponse
} from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { resetConstructor } from './burgerConstructorSlice';
import { ORDER_SLICE_NAME } from '../../utils/constants';

export const createOrderBurgerThunk = createAsyncThunk(
  `${ORDER_SLICE_NAME}/createOrderBurger`,
  async (id_ingredients: string[], { dispatch }) => {
    dispatch(resetConstructor());
    return orderBurgerApi(id_ingredients);
  }
);

export const getOrderByNumberThunk = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrderByNumber`,
  async (id_order: number) => getOrderByNumberApi(id_order)
);

interface OrderState {
  isLoading: boolean;
  order: TOrder | null;
}

export const initialState: OrderState = {
  isLoading: false,
  order: null
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    selectOrder: (sliceState: OrderState) => sliceState.order,
    selectLoadOrder: (sliceState: OrderState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderBurgerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrderBurgerThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        createOrderBurgerThunk.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.isLoading = false;
          state.order = action.payload.order;
        }
      )

      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumberThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        getOrderByNumberThunk.fulfilled,
        (state, action: PayloadAction<TOrderResponse>) => {
          state.isLoading = false;
          state.order = action.payload.orders[0];
        }
      );
  }
});

export const { selectLoadOrder, selectOrder } = orderSlice.selectors;

export const { resetOrder } = orderSlice.actions;
