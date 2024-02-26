import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Product } from '../types/Product';
import { Category, addFavoriteProduct, removeFavoriteProduct } from '../features/favoritesSlice';

export const useFavoriteState = () => {
  const favoritesProducts = useSelector((state: RootState) => state.favorites.favoritesProducts);
  const favoritesCount = useSelector(
    (state: RootState) => state.favorites.favoritesProducts.length,
  );

  const dispatch = useDispatch();

  const addToFavorites = (productToAdd: Product, category: Category) => {
    dispatch(addFavoriteProduct({ category, item: productToAdd }));
  };

  const removeFromFavorites = (productToRemove: Product) => {
    dispatch(removeFavoriteProduct(productToRemove));
  };

  const handleFavoriteInFavorites = (productToHandle: Product, category: Category) => {
    if (favoritesProducts.some(({ id }) => id === productToHandle.id)) {
      removeFromFavorites(productToHandle);
    } else {
      addToFavorites(productToHandle, category);
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
