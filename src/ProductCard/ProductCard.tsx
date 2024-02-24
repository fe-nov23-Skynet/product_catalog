import { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import emptyHeart from '../styles/icons/favourites_heart_like.svg';
import filledHeart from '../styles/icons/favourites_heart_filled.svg';
import { Product } from '../types/Product';
import { SpecsList } from '../components/SpecsList';
import { getSpecsList } from '../utils/getSpecsList';
import { SPECS_SHORT } from '../pages/ProductPage';
import { ProductShorts } from '../components/ProductShorts';
import { useCartState } from '../customHooks/useCartState';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ product, className = '' }) => {
  const [favoriteProduct, setfavoriteProduct] = useState('');
  const currentPath = useLocation().pathname.split('/')[1];
  const { addToCart, cartProducts } = useCartState();

  const makeFavorite = () => {
    if (!favoriteProduct) {
      setfavoriteProduct(product.id);
    } else {
      setfavoriteProduct('');
    }
  };

  return (
    <article
      className={classNames('card', className)}
    >
      <Link to={`/${currentPath}/${product.id}`}>
        <img
          className="card__img"
          src={product.images[0]}
          alt="Apple iPhone 11 Pro Max 64GB Gold"
        />
      </Link>

      <h1 className="card__title">
        <Link className="card__title-link" to={`/${currentPath}/${product.id}`}>{product.name}</Link>
      </h1>

      {/* <div className="card__price-text">
        {`$${product.priceDiscount}`}
        <span className="card__price-text--crossed">
          {`$${product.priceRegular}`}
          <div className="card__cross-line" />
        </span>
      </div>

      <div className="card__just-line" />

      <SpecsList
        specs={getSpecsList(product, SPECS_SHORT)}
        boldValue
      /> */}
      {/* <ProductShorts
        product={product}
        category={currentPath}
        inCart
        isFavorite
        specsList={SPECS_SHORT}
      /> */}

      <div className="card__submit-container">
        <a
          className="card__button-submit"
          href="/"
        >
          Add to cart
        </a>

        <button className="card__make-favorite" onClick={makeFavorite}>
          <img
            className="card__make-favorite-img"
            src={favoriteProduct === product.id ? filledHeart : emptyHeart}
            alt="Make favorite"
          />
        </button>
      </div>
    </article>
  );
};
