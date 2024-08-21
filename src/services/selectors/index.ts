import { RootState } from '../store';

export const selectOrderByNumber = (number: string) => (state: RootState) => {
  if (state.orders.orders.length) {
    const data = state.orders.orders.find((item) => item.number === +number);
    if (data) return data;
  }
  if (state.feed.feed.orders.length) {
    const data = state.orders.orders.find((item) => item.number === +number);
    if (data) return data;
  }
  if (state.order.order?.number) {
    return state.order.order;
  }
  return null;
};
