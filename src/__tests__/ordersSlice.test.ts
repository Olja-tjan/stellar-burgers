import {
  ordersSlice,
  initialState,
  getOrdersThunk
} from '../services/slices/ordersSlice';

describe('Проверка работы ordersSlice', function () {
  it('Изменение isLoading на true при отправке pending', function () {
    const actualState = {
      isLoading: true,
      orders: []
    };
    const newState = ordersSlice.reducer(
      { ...initialState },
      getOrdersThunk.pending('')
    );
    expect(newState).toEqual(actualState);
  });

  it('Получение ошибки и изменение isLoading на false при отправке rejected', function () {
    const testError = new Error('test error message');
    const newState = ordersSlice.reducer(
      { ...initialState },
      getOrdersThunk.rejected(testError, '')
    );
    expect(newState).toEqual(initialState);
  });

  it('Обновление данных ингридиентов и изменение isLoading на false при отправке fulfilled', function () {
    const testDataOrders = [
      {
        _id: '1234',
        ingredients: ['1', '4', '7', '1'],
        status: 'done',
        name: 'Тестовый бургер',
        createdAt: '2024-09-02T17:56:34.604Z',
        updatedAt: '2024-09-02T17:56:35.115Z',
        number: 51871
      }
    ];
    const actualState = {
      isLoading: false,
      orders: testDataOrders
    };
    const newState = ordersSlice.reducer(
      { ...initialState },
      getOrdersThunk.fulfilled(testDataOrders, '')
    );
    expect(newState).toEqual(actualState);
  });
});
