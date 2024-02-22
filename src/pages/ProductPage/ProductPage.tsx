import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import emptyHeart from '../../styles/icons/favourites_heart_like.svg';
import './productPage.scss';

import products from '../../productApi/phones.json';
import { SpecsList } from '../../components/SpecsList';
import { Spec } from '../../types/Spec';

interface Props {
  product: Product;
}

function getSpecsList(fromProduct: Product, filters: string[]) {
  return Object.entries(fromProduct).map(([key, value]) => {
    if (filters.includes(key)) {
      return { title: key, value: String(value) };
    }
    return null;
  }).filter(obj => obj !== null) as Spec[];
}

export const ProductPage: React.FC/* <Props> */ = (/* props */) => {
  // const { product } = props;
  const a = 0;
  const product = products[0];
  const numericID = 3587941;

  const descriptionSpecsList = [
    'screen',
    'resolution',
    'processor',
    'ram',
    'capacity',
    'camera',
    'zoom',
    'cell',
  ];
  const shortSpecsList = [
    'screen',
    'resolution',
    'processor',
    'ram',
  ];

  const descriptionSpecs: Spec[] = getSpecsList(product, descriptionSpecsList);
  const shortSpecs: Spec[] = getSpecsList(product, shortSpecsList);
  /* const list: Spec[] = descriptionSpecsList.map(
    spec => ({
      title: spec,
      value: String(product[spec]) || '',
    }),
  ); */

  /* const descriptionSpecs = descriptionSpecsList
    .map(key => ({ [key]: product[key] })); */

  // Object.keys(product).filter(spec => reference[spec] === 1);

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

          <div className="product-page__settings-group">
            <p className="product-page__colors">
              <div className="colors__header">
                <span className="product-page__settings-title">Available colors</span>
                <span className="product-page__id id--on-mobile">{`ID: ${numericID}`}</span>
              </div>

              <ul className="product-page__settings-list">
                <li><input type="radio" /></li>
                <li><input type="radio" /></li>
                <li><input type="radio" /></li>
                <li><input type="radio" /></li>
              </ul>

              <hr />
            </p>

            <p className="product-page__capacity">
              <span className="product-page__settings-title">Select capacity</span>

              <ul className="product-page__settings-list">
                {product.capacityAvailable.map(capacity => (
                  <li>
                    <input type="radio" />
                    {`${capacity}`}
                  </li>
                ))}
              </ul>

              <hr />
            </p>
          </div>

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

          <SpecsList specs={shortSpecs} boldValue />
        </div>
        <span className="product-page__id text-s-12 id--on-desktop">{`ID: ${numericID}`}</span>
        <div className="product-page__about">
          <h3>
            About
            <hr />
          </h3>

          {product.description.map((description) => (
            <>
              <h4>{description.title}</h4>
              {description.text.map(p => (
                <p className="text-gray">{p}</p>
              ))}
            </>
          ))}
        </div>
        <div className="product-page__specs">
          <h3>
            Tech specs
            <hr />
          </h3>

          <SpecsList specs={descriptionSpecs} />
        </div>
      </div>
    </section>
  );
};
