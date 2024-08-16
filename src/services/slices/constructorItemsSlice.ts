import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { TConstructorIngredient, TIngredient } from '@utils-types'

interface ConstructorItemsState {
  bun: TConstructorIngredient | null,
  ingredients: TConstructorIngredient[]
}

const initialState: ConstructorItemsState = {
  bun: null,
  ingredients: []
}

const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        return { payload: { ...ingredient, id: nanoid()}};
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? state.bun = action.payload
          : state.ingredients.push(action.payload)
      }
    },
    removeIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter(item => item.id !== action.payload.id)
    },
    upIngredient: (state, action: PayloadAction<number>)  => {
      [state.ingredients[action.payload], state.ingredients[action.payload - 1]] = [
        state.ingredients[action.payload - 1],
        state.ingredients[action.payload]
      ];
    },
    downIngredient: (state, action: PayloadAction<number>) => {
      [state.ingredients[action.payload], state.ingredients[action.payload + 1]] = [
        state.ingredients[action.payload + 1],
        state.ingredients[action.payload]
      ];
    }
  },
  selectors: {
    selectConstructorItems: (sliceState: ConstructorItemsState) => sliceState
  },
})

export const { selectConstructorItems } = constructorItemsSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient
} = constructorItemsSlice.actions;

export default constructorItemsSlice.reducer;
