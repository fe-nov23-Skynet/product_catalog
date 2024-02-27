/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLocation, Link } from 'react-router-dom';
import './CartPage.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useCartState } from '../../customHooks/useCartState';
import { CartProduct } from '../../components/CartProduct';

export const CartPage: React.FC = () => {
  const [successOrder, setSuccessOrder] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  const {
    cartProducts,
    cartCount,
    addToCart,
    deleteFromCart,
    removeFromCart,
  } = useCartState();

  const prevPath = '/cart';

  const calculateSum = () => cartProducts.map(p => p.priceDiscount * p.count)
    .reduce((sum, p) => sum + p, 0);

  const handleCheckout = () => {
    setSuccessOrder(true);
    setCount(cartCount);
    cartProducts.forEach(p => {
      deleteFromCart(p);
    });
  };

  useEffect(() => {
    if (successOrder) {
      toast.success(`Your order in quantity - ${count} was completed successfully :)`);
    }
  }, [successOrder]);

  return (
    <div className="cart_page">
      <h1 className="cart_title">Cart</h1>

      {cartProducts.length === 0 ? (
        <>
          {successOrder && (
            <div className="success_announcement">
              <h1 className="success_text">Your order has been completed successfully!</h1>
              <h3>&hearts; Thanks for choosing us &hearts;</h3>
              <Link
                to="/home"
                className="navigation_cart"
              >
                Go to order more
              </Link>
            </div>
          )}

          {!successOrder && (
            <div className="empty_cart">
              <h1 className="empty_text">Shopping cart is empty</h1>
              <h3>But it&apos;s never too late to fix it</h3>
              <Link
                to="/home"
                className="navigation_cart"
              >
                Go shopping
              </Link>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="cart_list_products">
            {cartProducts.map(
              product => (
                <CartProduct
                  product={product}
                  onAdd={() => addToCart(product, product.category)}
                  onDelete={() => deleteFromCart(product)}
                  onMinus={() => removeFromCart(product)}
                  prevPath={prevPath}
                  key={product.id}
                />
              ),
            )}
          </div>

          <div className="cart_total">
            <div>
              <div className="cart_total__sum">{`$${calculateSum()}`}</div>
              <div className="cart_total__number">{`Total for ${cartCount} items`}</div>
            </div>

            <hr />
            <button
              className="cart_total__checkout"
              onClick={() => handleCheckout()}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
