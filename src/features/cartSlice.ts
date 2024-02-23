/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

// export type Category = 'phones' | 'accessories' | 'tablets';
export type Category = string;

interface CartItem extends Product {
  count: number;
  category: string;
}

interface CartActionItem {
  category: Category;
  item: CartItem | Product;
}

export interface CartState {
  cartProducts: CartItem[];
  itemsCount: number;
}

const initialState: CartState = {
  cartProducts: [],
  itemsCount: 0,
};

export const cartSlice = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartActionItem>) => {
      const { category, item } = action.payload;
      const arr = [...state.cartProducts];
      const isItem = arr.find(product => product.id === item.id);
      const count = isItem?.count || 0;

      if (count === 0) {
        const newItem = {
          ...item,
          count: count + 1,
          category,
        };
        state.cartProducts = [...state.cartProducts, newItem];
        state.itemsCount += 1;
      }

      if (count > 0 && isItem) {
        isItem.count += 1;
        state.itemsCount += 1;
      }
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      const isProductInCart = state.cartProducts.some(p => p.id === action.payload.id);
      const item = state.cartProducts.find(p => p.id === action.payload.id);
      const count = item?.count || 0;

      if (count > 1 && item) {
        item.count -= 1;
        state.itemsCount -= 1;
      }

      if (count === 1) {
        state.cartProducts = state.cartProducts.filter(({ id }) => id !== action.payload.id);
        state.itemsCount -= 1;
      }
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
