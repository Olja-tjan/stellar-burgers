import { rootReducer } from '../services/store';

import { userSlice } from '../services/slices/userSlice';
import { ingredientsSlice } from '../services/slices/ingredientsSlice';
import { feedSlice } from '../services/slices/feedSlice';
import { orderSlice } from '../services/slices/orderSlice';
import { ordersSlice } from '../services/slices/ordersSlice';
import { burgerConstructorSlice } from '../services/slices/burgerConstructorSlice';

describe('Проверка работы rootReducer', function () {
  it('Правильно инициализирует состояние', function () {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      user: userSlice.reducer(undefined, initAction),
      ingredients: ingredientsSlice.reducer(undefined, initAction),
      burgerConstructor: burgerConstructorSlice.reducer(undefined, initAction),
      feed: feedSlice.reducer(undefined, initAction),
      orders: ordersSlice.reducer(undefined, initAction),
      order: orderSlice.reducer(undefined, initAction)
    });
  });

  it('Правильно обрабатывает неизвестный экшен', function () {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, unknownAction);
    expect(state).toEqual({
      user: userSlice.reducer(undefined, unknownAction),
      ingredients: ingredientsSlice.reducer(undefined, unknownAction),
      burgerConstructor: burgerConstructorSlice.reducer(
        undefined,
        unknownAction
      ),
      feed: feedSlice.reducer(undefined, unknownAction),
      orders: ordersSlice.reducer(undefined, unknownAction),
      order: orderSlice.reducer(undefined, unknownAction)
    });
  });
});
