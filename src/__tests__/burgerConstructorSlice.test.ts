import {
  burgerConstructorSlice,
  initialState,
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient,
  resetConstructor
} from '../services/slices/burgerConstructorSlice';
import { TConstructorIngredient } from '../utils/types';

describe('Проверка работы constructorSlice', function () {
  const ingredient1: TConstructorIngredient = {
    id: '4',
    _id: '4',
    name: 'Ингредиент 4',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };
  const ingredient2: TConstructorIngredient = {
    id: '2',
    _id: '2',
    name: 'Ингредиент 2',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };
  const bun: TConstructorIngredient = {
    id: '1',
    _id: '1',
    name: 'Ингредиент 1',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  it('Корректно добавляется ингредиент', function () {
    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient1)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  it('Корректно добавляется булка', function () {
    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );
    expect(newState.ingredients).toHaveLength(0);
    expect(newState.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  it('Корректно удаляется ингредиент', () => {
    const actualState = {
      bun: null,
      ingredients: [ingredient1]
    };
    const newState = burgerConstructorSlice.reducer(
      actualState,
      removeIngredient(ingredient1)
    );
    expect(newState.ingredients).toHaveLength(0);
  });

  it('Корректно перемещается ингредиент вверх', () => {
    const actualState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const newState = burgerConstructorSlice.reducer(
      actualState,
      upIngredient(1)
    );
    expect(newState.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('Корректно перемещается ингредиент вниз', () => {
    const actualState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const newState = burgerConstructorSlice.reducer(
      actualState,
      downIngredient(0)
    );
    expect(newState.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('Корректно очищается конструктор', () => {
    const actualState = {
      bun: bun,
      ingredients: [ingredient1]
    };
    const newState = burgerConstructorSlice.reducer(
      actualState,
      resetConstructor()
    );
    expect(newState).toEqual({ bun: null, ingredients: [] });
  });
});
