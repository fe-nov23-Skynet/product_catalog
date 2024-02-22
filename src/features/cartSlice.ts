import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export interface CartState {
  cartProducts: Product[];
}

const initialState: CartState = {
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      // eslint-disable-next-line no-param-reassign
      state.cartProducts = [...state.cartProducts, action.payload];
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      // eslint-disable-next-line no-param-reassign
      state.cartProducts = state.cartProducts.filter(({ id }) => id !== action.payload.id);
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
