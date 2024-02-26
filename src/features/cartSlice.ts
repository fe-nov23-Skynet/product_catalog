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

const prevState = localStorage.getItem('cartState');

const initialState: CartState = prevState ? JSON.parse(prevState) : {
  cartProducts: [],
  itemsCount: 0,
};

function saveCartState(state: CartState) {
  localStorage.setItem('cartState', JSON.stringify(state));
}

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
        const newItem: CartItem = {
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

      saveCartState(state);
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

      saveCartState(state);
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      const productTodelete = state.cartProducts.find(({ id }) => id === action.payload.id);
      const countToDelete = productTodelete?.count;

      state.cartProducts = state.cartProducts.filter(({ id }) => id !== productTodelete?.id);
      state.itemsCount -= countToDelete || 0;

      saveCartState(state);
    },
  },
});

export const { addProduct, removeProduct, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;
