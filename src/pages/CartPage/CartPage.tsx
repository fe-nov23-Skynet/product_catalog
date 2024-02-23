/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import products from '../../productApi/products.json';
import './CartPage.scss';
import { ReactComponent as Close } from '../../styles/icons/close.svg';
import { ReactComponent as Minus } from '../../styles/icons/minus.svg';
import { ReactComponent as Plus } from '../../styles/icons/plus.svg';
import { Product } from '../../types/Product';

export const CartPage: React.FC = () => {
  const productsCart: Product[] = [];

  const calculateSum = () => productsCart.map(p => p.priceDiscount).reduce((sum, p) => sum + p, 0);

  return (
    <div className="cart_page">
      <h1 className="cart_title">Cart</h1>

      {productsCart.length === 0 ? (
        <div className="empty_cart">
          <h1 className="empty_text">Shopping cart is empty</h1>
          <h3>But it&apos;s never too late to fix it</h3>
          <Link to="/home" className="navigation_empty_cart">Go shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart_list_products">
            {productsCart.map(product => (
              <div className="cart_product">
                <div className="cart_product__top">
                  <button className="cart_product__delete" onClick={() => { }}><Close /></button>
                  <img
                    src={product.images[0]}
                    alt={`${product.namespaceId}`}
                    className="cart_product__img"
                  />
                  <span className="cart_product__name">{product.name}</span>
                </div>

                <div className="cart_product__bottom">
                  <div className="number">
                    <button className="cart_product__number minus"><Minus /></button>
                    <span>1</span>
                    <button className="cart_product__number plus"><Plus /></button>
                  </div>

                  <span className="cart_product__price">{`$${product.priceDiscount}`}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cart_total">
            <div>
              <div className="cart_total__sum">{`$${calculateSum()}`}</div>
              <div className="cart_total__number">{`Total for ${productsCart.length} items`}</div>
            </div>

            <hr />
            <button className="cart_total__checkout">Checkout</button>
          </div>
        </>
      )}

    </div>

  );
};
