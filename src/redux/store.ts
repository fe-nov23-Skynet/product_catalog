import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import favoritesReducer from '../features/favoritesSlice';
import UIReducer from '../features/UISlice';
import LangReducer from '../features/translateSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    ui: UIReducer,
    language: LangReducer,
  },
});
