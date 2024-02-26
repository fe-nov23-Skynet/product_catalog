import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Product } from '../types/Product';
import { addFavoriteProduct, removeFavoriteProduct } from '../features/favoritesSlice';

export const useFavoriteState = () => {
  const favoritesProducts = useSelector((state: RootState) => state.favorites.favoritesProducts);
  const favoritesCount = useSelector(
    (state: RootState) => state.favorites.favoritesProducts.length,
  );

  const dispatch = useDispatch();

  const addToFavorites = (productToAdd: Product) => {
    dispatch(addFavoriteProduct(productToAdd));
  };

  const removeFromFavorites = (productToRemove: Product) => {
    dispatch(removeFavoriteProduct(productToRemove));
  };

  const handleFavoriteInFavorites = (productToHandle: Product) => {
    if (favoritesProducts.some(({ id }) => id === productToHandle.id)) {
      removeFromFavorites(productToHandle);
    } else {
      addToFavorites(productToHandle);
    }
  };

  return {
    favoritesProducts,
    favoritesCount,
    addToFavorites,
    removeFromFavorites,
    handleFavoriteInFavorites,
  };
};
