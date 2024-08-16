import { getIngredientsApi } from '@api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TIngredient } from '@utils-types'

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
)

interface IngredientsState {
  isLoading: boolean,
  ingredients: TIngredient[]
}

const initialState: IngredientsState = {
  isLoading: false,
  ingredients: []
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (sliceState: IngredientsState) => sliceState.ingredients,
    selectLoadIngredients: (sliceState: IngredientsState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
    .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getIngredientsThunk.rejected, (state) => {
        state.isLoading = false;
    })
    .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload
    })
}
})

export const { selectIngredients, selectLoadIngredients } = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
