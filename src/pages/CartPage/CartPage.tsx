/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLocation, Link } from 'react-router-dom';
import './CartPage.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as Close } from '../../styles/icons/close.svg';
import { ReactComponent as Minus } from '../../styles/icons/minus.svg';
import { ReactComponent as Plus } from '../../styles/icons/plus.svg';
import { useCartState } from '../../customHooks/useCartState';

export const CartPage: React.FC = () => {
  const [successOrder, setSuccessOrder] = useState<boolean | null>(null);
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

  return (
    <div className="cart_page">
      <h1 className="cart_title">Cart</h1>

      {cartProducts.length === 0 ? (
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
      ) : (
        <>
          {(successOrder === null) && (
            <>
              <div className="cart_list_products">
                {cartProducts.map(product => (
                  <div className="cart_product" key={product.id}>
                    <div className="cart_product__top">
                      <button
                        className="cart_product__delete"
                        onClick={() => deleteFromCart(product)}
                      >
                        <Close />
                      </button>

                      <img
                        src={product.images[0]}
                        alt={`${product.namespaceId}`}
                        className="cart_product__img"
                      />

                      <Link
                        to={`/${product.category}/${product.id}`}
                        className="cart_product__name"
                        state={{ prevPath }}
                      >
                        {product.name}
                      </Link>
                    </div>

                    <div className="cart_product__bottom">
                      <div className="number">
                        <button
                          className={classNames('cart_product__number minus', {
                            minus_black: product.count > 1,
                          })}
                          onClick={() => removeFromCart(product)}
                        >
                          <Minus />
                        </button>

                        <span>{product.count}</span>

                        <button
                          className="cart_product__number plus"
                          onClick={() => addToCart(product, product.category)}
                        >
                          <Plus />
                        </button>
                      </div>

                      <span className="cart_product__price">{`$${product.priceDiscount}`}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart_total">
                <div>
                  <div className="cart_total__sum">{`$${calculateSum()}`}</div>
                  <div className="cart_total__number">{`Total for ${cartCount} items`}</div>
                </div>

                <hr />
                <button
                  className="cart_total__checkout"
                  onClick={() => {
                    setSuccessOrder(true);
                    // cartProducts.length = 0;
                  }}
                >
                  Checkout
                </button>
              </div>
            </>
          )}

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

        </>
      )}
    </div>
  );
};
