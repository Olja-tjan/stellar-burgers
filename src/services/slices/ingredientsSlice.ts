import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from '../../utils/constants';

export const getIngredientsThunk = createAsyncThunk<TIngredient[]>(
  `${INGREDIENTS_SLICE_NAME}/getIngredients`,
  async () => getIngredientsApi()
);

interface IngredientsState {
  isLoading: boolean;
  ingredients: TIngredient[];
}

export const initialState: IngredientsState = {
  isLoading: false,
  ingredients: []
};

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (sliceState: IngredientsState) => sliceState.ingredients,
    selectLoadIngredients: (sliceState: IngredientsState) =>
      sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredientsThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        getIngredientsThunk.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
        }
      );
  }
});

export const { selectIngredients, selectLoadIngredients } =
  ingredientsSlice.selectors;
