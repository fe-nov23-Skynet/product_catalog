import { useState, useTransition } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../types/Product';
import { SpecsList } from '../components/SpecsList';
import { getSpecsList } from '../utils/getSpecsList';
import { SPECS_SHORT } from '../pages/ProductPage';
import { useCartState } from '../customHooks/useCartState';
import { CartButton } from '../components/Buttons/CartButton/CartButton';
import { FavoriteButton } from '../components/Buttons/FavoriteButton/FavoriteButton';
import { useFavoriteState } from '../customHooks/useFavoriteState';
import { FavoriteItem } from '../features/favoritesSlice';
import { useTranslate } from '../customHooks/useTranslate';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props {
  product: FavoriteItem | Product;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ product, className = '' }) => {
  const [favoriteProduct, setfavoriteProduct] = useState('');
  const category = ('category' in product) ? product.category : useLocation().pathname.split('/')[1];
  const currentPath = useLocation().pathname.split('/')[1];
  const { addToCart, cartProducts } = useCartState();
  const { addToFavorites, removeFromFavorites, favoritesProducts } = useFavoriteState();

  const { LanguageState } = useTranslate();

  const currency = LanguageState.language === 'en' ? '$' : '₴';
  const currPrice = LanguageState.language === 'en' ? product.priceDiscount : Math.ceil(product.priceDiscount * 38.5);
  const oldPrice = LanguageState.language === 'en' ? product.priceRegular : product.priceRegular * 40;

  return (
    <article
      className={classNames('card', className)}
    >
      <Link
        to={`/${category}/${product.id}`}
        state={{ prevPath: `/${currentPath}` }}
      >
        <img
          className="card__img"
          src={product.images[0]}
          alt="Apple iPhone 11 Pro Max 64GB Gold"
        />
      </Link>

      <h1 className="card__title">
        <Link
          className="card__title-link"
          to={`/${category}/${product.id}`}
          state={{ prevPath: `/${currentPath}` }}
        >
          {product.name}
        </Link>
      </h1>

      <div className={classNames('card__price')}>
        <span className="card__price-current">
          {`${currency}${currPrice}`}
          <span className="card__price-old">
            {`${currency}${oldPrice}`}
          </span>
        </span>
        <hr />
      </div>

      <SpecsList
        specs={getSpecsList(product, SPECS_SHORT)}
        boldValue
        className="text-s-12"
      />

      <div className="card__submit-container">
        <CartButton
          onClick={() => addToCart(product, category)}
          active={cartProducts.some(({ id }) => id === product.id)}
        />

        <FavoriteButton
          onClickAdd={() => addToFavorites(product, currentPath)}
          onClickRemove={() => removeFromFavorites(product)}
          active={favoritesProducts.some(({ id }) => id === product.id)}
        />
      </div>
    </article>
  );
};
