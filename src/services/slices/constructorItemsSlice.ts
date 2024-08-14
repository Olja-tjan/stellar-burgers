import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { TConstructorIngredient, TIngredient } from '@utils-types'

interface ConstructorItemsState {
  bun?: TConstructorIngredient,
  ingredients: TConstructorIngredient[]
}

const initialState: ConstructorItemsState = {
  ingredients: []
}

const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addIngredients: {
      prepare: (ingredient: TIngredient) => {
        return { payload: { ...ingredient, id: nanoid()}};
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? state.bun = action.payload
          : state.ingredients.push(action.payload)
      }
    },
    removeIngredients: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(i => i.id !== action.payload)
    },
    // upIngredient
    // downIngredient
    // clearConstructorItems
  },
  selectors: {
    selectConstructorItems: (sliceState) => sliceState
  },
})

export const { selectConstructorItems } = constructorItemsSlice.selectors;

export default constructorItemsSlice.reducer;
