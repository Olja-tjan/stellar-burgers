import {
  feedSlice,
  FeedState,
  getFeedThunk
} from '../services/slices/feedSlice';

describe('Проверка работы feedSlice', function () {
  const initialState: FeedState = {
    isLoading: false,
    feed: {
      orders: [],
      total: 0,
      totalToday: 0
    }
  };

  it('Изменение isLoading на true при отправке pending', function () {
    const actualState = {
      isLoading: true,
      feed: {
        orders: [],
        total: 0,
        totalToday: 0
      }
    };
    const newState = feedSlice.reducer(
      { ...initialState },
      getFeedThunk.pending('')
    );
    expect(newState).toEqual(actualState);
  });

  it('Получение ошибки и изменение isLoading на false при отправке rejected', function () {
    const testError = new Error('test error message');
    const newState = feedSlice.reducer(
      { ...initialState },
      getFeedThunk.rejected(testError, '')
    );
    expect(newState).toEqual(initialState);
  });

  it('Обновление данных ингридиентов и изменение isLoading на false при отправке fulfilled', function () {
    const testDataFeed = {
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
      ],
      total: 1,
      totalToday: 1
    };
    const actualState = {
      isLoading: false,
      feed: testDataFeed
    };
    const newState = feedSlice.reducer(
      { ...initialState },
      getFeedThunk.fulfilled(testDataFeed, '')
    );
    expect(newState).toEqual(actualState);
  });
});
