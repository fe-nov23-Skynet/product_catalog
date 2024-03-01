/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CartItem } from '../../features/cartSlice';
import { ReactComponent as Close } from '../../styles/icons/close.svg';
import { ReactComponent as Minus } from '../../styles/icons/minus.svg';
import { ReactComponent as Plus } from '../../styles/icons/plus.svg';

interface Props {
  product: CartItem;
  prevPath: string;
  onDelete: () => void;
  onAdd: () => void;
  onMinus: () => void;
}

export const CartProduct: React.FC<Props> = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { product, prevPath, onAdd, onDelete, onMinus } = props;
  const [deleting, setDeleting] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    let timerID: NodeJS.Timeout | undefined;

    if (deleting) {
      timerID = setTimeout(() => {
        onDelete();
      }, 900);
    }
    return () => clearTimeout(timerID);
  }, [deleting]);

  const handleDelete = () => {
    setDeleting(true);
  };

  return (
    <div
      className={classNames('cart_product', { 'item-deleting': deleting })}
      key={product.id}
    >
      <div className="cart_product__top">
        <button
          className="cart_product__delete"
          onClick={handleDelete}
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
              nocursor: product.count <= 1,
            })}
            disabled={product.count <= 1}
            onClick={onMinus}
          >
            <Minus />
          </button>

          <span className="count_product">{product.count}</span>

          <button
            className="cart_product__number plus"
            onClick={onAdd}
          >
            <Plus />
          </button>
        </div>

        <span className="cart_product__price">{`$${product.priceDiscount}`}</span>
      </div>
    </div>
  );
};
