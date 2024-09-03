import {
  ingredientsSlice,
  IngredientsState,
  getIngredientsThunk
} from '../services/slices/ingredientsSlice';

describe('Проверка работы ingredientsSlice', function () {
  const initialState: IngredientsState = {
    isLoading: false,
    ingredients: []
  };

  it('Изменение isLoading на true при отправке pending', function () {
    const actualState = {
      isLoading: true,
      ingredients: []
    };
    const newState = ingredientsSlice.reducer(
      { ...initialState },
      getIngredientsThunk.pending('')
    );
    expect(newState).toEqual(actualState);
  });

  it('Получение ошибки и изменение isLoading на false при отправке rejected', function () {
    const testError = new Error('test error message');
    const newState = ingredientsSlice.reducer(
      { ...initialState },
      getIngredientsThunk.rejected(testError, '')
    );
    expect(newState).toEqual(initialState);
  });

  it('Обновление данных ингридиентов и изменение isLoading на false при отправке fulfilled', function () {
    const testDataIngredients = [
      {
        _id: '4',
        name: 'Ингредиент 4',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      }
    ];
    const actualState = {
      isLoading: false,
      ingredients: testDataIngredients
    };
    const newState = ingredientsSlice.reducer(
      { ...initialState },
      getIngredientsThunk.fulfilled(testDataIngredients, '')
    );
    expect(newState).toEqual(actualState);
  });
});
