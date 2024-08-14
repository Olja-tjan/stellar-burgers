import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/ingredientsSlice';
import ordersSlice from './slices/ordersSlice';
import userSlice from './slices/userSlice';
import constructorItemsSlice from './slices/constructorItemsSlice';
import feedSlice from './slices/feedSlice';

const rootReducer = combineReducers({
  feed: feedSlice,
  constructorItems: constructorItemsSlice,
  ingredients: ingredientsSlice,
  orders: ordersSlice,
  user: userSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
