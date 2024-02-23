import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export interface FavoritesState {
  favoritesProducts: Product[];
}

const initialState: FavoritesState = {
  favoritesProducts: [],
};

export const favoritesSlice = createSlice({
  name: 'favoritesProducts',
  initialState,
  reducers: {
    addFavoriteProduct: (state, action: PayloadAction<Product>) => {
      // eslint-disable-next-line no-param-reassign
      state.favoritesProducts = [...state.favoritesProducts, action.payload];
    },
    removeFavoriteProduct: (state, action: PayloadAction<Product>) => {
      // eslint-disable-next-line no-param-reassign
      state.favoritesProducts = state.favoritesProducts
        .filter(({ id }) => id !== action.payload.id);
    },
  },
});

export const { addFavoriteProduct, removeFavoriteProduct } = favoritesSlice.actions;
export default favoritesSlice.reducer;
