import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import emptyHeart from '../../styles/icons/favourites_heart_like.svg';
import './productPage.scss';

import products from '../../productApi/tablets.json';

interface Props {
  product: Product;
}

export const ProductPage: React.FC/* <Props> */ = (/* props */) => {
  // const { product } = props;
  const a = 0;
  const product = products[0];
  const numericID = 3587941;

  return (
    <section className="product-page">
      <div>
        <Link to="#/">Back</Link>
      </div>

      <h2 className="product-page__title">{product.name}</h2>

      <div className="product-page__info">
        <div className="product-page__images">
          <img src={product.images[0]} alt={product.name} />
        </div>

        <div className="product-page__settings">
          <div className="colors__header">
            <span className="product-page__colors-title">Available colors</span>
            <span className="product-page__id id--on-mobile">{`ID: ${numericID}`}</span>
          </div>

          <div className="product-page__colors">
            <ul className="product-page__list">
              <li><input type="radio" /></li>
              <li><input type="radio" /></li>
              <li><input type="radio" /></li>
              <li><input type="radio" /></li>
            </ul>
          </div>

          <hr />

          <div className="product-page__capacity">
            <span className="product-page__colors-title">Select capacity</span>

            <ul className="product-page__list">
              {product.capacityAvailable.map(capacity => (
                <li>
                  <input type="radio" />
                  {`${capacity}`}
                </li>
              ))}
            </ul>
          </div>

          <hr />

          <div className="card__price-text">
            {product.priceDiscount}
            <span className="card__price-text--crossed">
              {product.priceRegular}
              <div className="card__cross-line" />
            </span>
          </div>

          <div className="card__submit-container">
            <a
              className="card__button-submit"
              href="/"
            >
              Add to cart
            </a>

            <button className="card__make-favorite">
              <img
                className="card__make-favorite-img"
                src={emptyHeart}
                alt="Make favorite"
              />
            </button>
          </div>

          <h3 className="card__product-info">
            <p className="card__product-info-prop">
              Screen
            </p>
            <p className="card__product-info-value">
              {product.screen}
            </p>
            <p className="card__product-info-prop">
              Resolution
            </p>
            <p className="card__product-info-value">
              {product.resolution}
            </p>
            <p className="card__product-info-prop">
              Processor
            </p>
            <p className="card__product-info-value">
              {product.processor}
            </p>
            <p className="card__product-info-prop">
              RAM
            </p>
            <p className="card__product-info-value">
              {product.ram}
            </p>
          </h3>
        </div>
        <span className="product-page__id text-s-12 id--on-desktop">{`ID: ${numericID}`}</span>
        <div className="product-page__about">
          <h3>About</h3>
          <hr />
          {product.description.map((description) => (
            <>
              <h4>{description.title}</h4>
              <p>{description.text}</p>
            </>
          ))}
        </div>
        <div className="product-page__specs">
          <h3>Tech specs</h3>
          <hr />
          <h3 className="card__product-info">
            <p className="card__product-info-prop">
              Screen
            </p>
            <p className="card__product-info-value">
              {product.screen}
            </p>
            <p className="card__product-info-prop">
              Resolution
            </p>
            <p className="card__product-info-value">
              {product.resolution}
            </p>
            <p className="card__product-info-prop">
              Processor
            </p>
            <p className="card__product-info-value">
              {product.processor}
            </p>
            <p className="card__product-info-prop">
              RAM
            </p>
            <p className="card__product-info-value">
              {product.ram}
            </p>
            <p className="card__product-info-prop">
              Built in memory
            </p>
            <p className="card__product-info-value">
              {product.capacity}
            </p>
            <p className="card__product-info-prop">
              Camera
            </p>
            <p className="card__product-info-value">
              {product.camera}
            </p>
            <p className="card__product-info-prop">
              Zoom
            </p>
            <p className="card__product-info-value">
              {product.zoom}
            </p>
            <p className="card__product-info-prop">
              Cell
            </p>
            <p className="card__product-info-value">
              {product.cell}
            </p>
          </h3>
        </div>
      </div>
    </section>
  );
};
