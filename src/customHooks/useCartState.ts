import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Product } from '../types/Product';
// eslint-disable-next-line object-curly-newline
import { Category, addProduct, removeProduct, deleteProduct } from '../features/cartSlice';

export const useCartState = () => {
  const cartProducts = useSelector((state: RootState) => state.cart.cartProducts);
  const cartCount = useSelector((state: RootState) => state.cart.itemsCount);

  const dispatch = useDispatch();

  const addToCart = (productToAdd: Product, category: Category) => {
    dispatch(addProduct({ category, item: productToAdd }));
  };

  const deleteFromCart = (productToAdd: Product) => {
    dispatch(deleteProduct(productToAdd));
  };

  const removeFromCart = (productToAdd: Product) => {
    dispatch(removeProduct(productToAdd));
  };

  const handleProductInCart = (productToHandle: Product, category: Category) => {
    if (cartProducts.some(({ id }) => id === productToHandle.id)) {
      removeFromCart(productToHandle);
    } else {
      addToCart(productToHandle, category);
    }
  };

  return {
    cartProducts,
    cartCount,
    addToCart,
    removeFromCart,
    deleteFromCart,
    handleProductInCart,
  };
};
