/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './CartPage.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Helmet } from 'react-helmet';
import { useCartState } from '../../customHooks/useCartState';
import { CartProduct } from '../../components/CartProduct';

export const CartPage: React.FC = () => {
  const [successOrder, setSuccessOrder] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  const { t } = useTranslation();

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
      <Helmet>
        <title>{'cart'.toUpperCase()}</title>
      </Helmet>

      <h1 className="cart_title">{t('cart.cart')}</h1>

      {cartProducts.length === 0 ? (
        <>
          {successOrder && (
            <div className="success_announcement">
              <h1 className="success_text">{t('cart.success')}</h1>
              <h3>
                &hearts;
                {t('cart.success')}
                &hearts;
              </h3>
              <Link
                to="/home"
                className="navigation_cart"
              >
                {t('cart.orderMore')}
              </Link>
            </div>
          )}

          {!successOrder && (
            <div className="empty_cart">
              <h1 className="empty_text">{t('cart.empty')}</h1>
              <h3>{t('cart.emptyAdvice')}</h3>
              <Link
                to="/home"
                className="navigation_cart"
              >
                {t('cart.goShopping')}
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
              <div className="cart_total__number">{`${t('cart.totalFor')} ${cartCount} ${t('cart.items')}`}</div>
            </div>

            <hr />
            <button
              className="cart_total__checkout"
              onClick={() => handleCheckout()}
            >
              {t('cart.checkout')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
