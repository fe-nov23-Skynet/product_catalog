import { useState } from 'react';
import emptyHeart from '../styles/icons/favourites_heart_like.svg';
import filledHeart from '../styles/icons/favourites_heart_filled.svg';
import products from '../productApi/products.json';

export const ProductCard = () => {
  const [favoriteProduct, setfavoriteProduct] = useState('');

  const makeFavorite = () => {
    if (!favoriteProduct) {
      setfavoriteProduct(products.id);
    } else {
      setfavoriteProduct('');
    }
  };

  return (
    <article
      className="card"
    >
      <img
        className="card__img"
        src={products.images[0]}
        alt="Apple iPhone 11 Pro Max 64GB Gold"
      />

      <h1 className="card__title">
        {products.name}
      </h1>

      <div className="card__price-text">
        {products.priceDiscount}
        <span className="card__price-text--crossed">
          {products.priceRegular}
          <div className="card__cross-line" />
        </span>
      </div>

      <div className="card__just-line" />

      <h3 className="card__product-info">
        <p className="card__product-info-prop">
          Screen
        </p>
        <p className="card__product-info-value">
          {products.screen}
        </p>
        <p className="card__product-info-prop">
          Capacity
        </p>
        <p className="card__product-info-value">
          {products.capacity}
        </p>
        <p className="card__product-info-prop">
          RAM
        </p>
        <p className="card__product-info-value">
          {products.ram}
        </p>
      </h3>

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
            src={favoriteProduct === products.id ? filledHeart : emptyHeart}
            alt="Make favorite"
          />
        </button>
      </div>
    </article>
  );
};
