import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export type Category = string;

export interface FavoriteItem extends Product {
  category: Category;
}

interface FavoriteActionItem {
  category: Category;
  item: FavoriteItem | Product;
}

export interface FavoritesState {
  favoritesProducts: Product[];
}

const prevState = localStorage.getItem('favoriteState');

const initialState: FavoritesState = prevState ? JSON.parse(prevState) : {
  favoritesProducts: [],
};

function saveFavoriteState(state: FavoritesState) {
  localStorage.setItem('favoriteState', JSON.stringify(state));
}

export const favoritesSlice = createSlice({
  name: 'favoritesProducts',
  initialState,
  reducers: {
    addFavoriteProduct: (state, action: PayloadAction<FavoriteActionItem>) => {
      const { category, item } = action.payload;
      const isItem = state.favoritesProducts.find(product => product.id === item.id);
      if (!isItem) {
        const newItem: FavoriteItem = {
          ...item,
          category,
        };

        // eslint-disable-next-line no-param-reassign
        state.favoritesProducts = [...state.favoritesProducts, newItem];

        saveFavoriteState(state);
      }
    },
    removeFavoriteProduct: (state, action: PayloadAction<Product>) => {
      const item = state.favoritesProducts.find(p => p.id === action.payload.id);

      if (item) {
        // eslint-disable-next-line no-param-reassign
        state.favoritesProducts = state.favoritesProducts.filter(p => p.id !== item.id);
        saveFavoriteState(state);
      }
    },
  },
});

export const { addFavoriteProduct, removeFavoriteProduct } = favoritesSlice.actions;
export default favoritesSlice.reducer;
