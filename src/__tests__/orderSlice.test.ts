import {
  orderSlice,
  initialState,
  getOrderByNumberThunk,
  createOrderBurgerThunk
} from '../services/slices/orderSlice';

describe('Проверка работы orderSlice', function () {
  // Запрос createOrderBurgerThunk:
  it('В запросе createOrderBurgerThunk, изменение isLoading на true при отправке pending', function () {
    const actualState = {
      isLoading: true,
      order: null
    };
    const newState = orderSlice.reducer(
      { ...initialState },
      createOrderBurgerThunk.pending('', [])
    );
    expect(newState).toEqual(actualState);
  });

  it('В запросе createOrderBurgerThunk, получение ошибки и изменение isLoading на false при отправке rejected', function () {
    const testError = new Error('test error message');
    const newState = orderSlice.reducer(
      { ...initialState },
      createOrderBurgerThunk.rejected(testError, '', [])
    );
    expect(newState).toEqual(initialState);
  });

  it('В запросе createOrderBurgerThunk, обновление данных ингридиентов и изменение isLoading на false при отправке fulfilled', function () {
    const testDataOrder = {
      success: true,
      order: {
        _id: '1234',
        ingredients: ['1', '4', '7', '1'],
        status: 'done',
        name: 'Тестовый бургер',
        createdAt: '2024-09-02T17:56:34.604Z',
        updatedAt: '2024-09-02T17:56:35.115Z',
        number: 51871
      },
      name: 'Тестовый бургер'
    };
    const actualState = {
      isLoading: false,
      order: testDataOrder.order
    };
    const newState = orderSlice.reducer(
      { ...initialState },
      createOrderBurgerThunk.fulfilled(testDataOrder, '', ['1234'])
    );
    expect(newState).toEqual(actualState);
  });

  // Запрос getOrderByNumberThunk:
  it('В запросе getOrderByNumberThunk, изменение isLoading на true при отправке pending', function () {
    const actualState = {
      isLoading: true,
      order: null
    };
    const newState = orderSlice.reducer(
      { ...initialState },
      getOrderByNumberThunk.pending('', 0)
    );
    expect(newState).toEqual(actualState);
  });

  it('В запросе getOrderByNumberThunk, получение ошибки и изменение isLoading на false при отправке rejected', function () {
    const testError = new Error('test error message');
    const newState = orderSlice.reducer(
      { ...initialState },
      getOrderByNumberThunk.rejected(testError, '', 0)
    );
    expect(newState).toEqual(initialState);
  });

  it('В запросе getOrderByNumberThunk, обновление данных ингридиентов и изменение isLoading на false при отправке fulfilled', function () {
    const testDataOrder = {
      success: true,
      orders: [
        {
          _id: '1234',
          ingredients: ['1', '4', '7', '1'],
          status: 'done',
          name: 'Тестовый бургер',
          createdAt: '2024-09-02T17:56:34.604Z',
          updatedAt: '2024-09-02T17:56:35.115Z',
          number: 51871
        }
      ]
    };
    const actualState = {
      isLoading: false,
      order: testDataOrder.orders[0]
    };
    const newState = orderSlice.reducer(
      { ...initialState },
      getOrderByNumberThunk.fulfilled(testDataOrder, '', 1234)
    );
    expect(newState).toEqual(actualState);
  });
});
