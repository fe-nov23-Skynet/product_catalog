import { Link, useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { Product } from '../../types/Product';
import emptyHeart from '../../styles/icons/favourites_heart_like.svg';
import './productPage.scss';

import { SpecsList } from '../../components/SpecsList';
import { Loader } from '../../components/Loader';
import { ReactComponent as IconLeft } from '../../styles/icons/chevron_arrow_left.svg';
import { getSpecsList } from '../../utils/getSpecsList';
import { getProduct } from '../../api/api';
import { SelectImage } from '../../components/SelectImage/SelectImage';
import { ColorLink } from '../../components/UI/ColorLink';
import { useCartState } from '../../customHooks/useCartState';
import { OptionLink } from '../../components/UI/OptionLink';

interface Props {
  product: Product;
}

const SPECS_LONG = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'capacity',
  'camera',
  'zoom',
  'cell',
];
export const SPECS_SHORT = [
  'screen',
  'resolution',
  'processor',
  'ram',
];

export const ProductPage: React.FC/* <Props> */ = (/* props */) => {
  const currentPath = useLocation().pathname.split('/')[1];
  const { state } = useLocation();
  const { id: productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  // eslint-disable-next-line object-curly-newline
  const { cartProducts, cartCount, handleProductInCart } = useCartState();

  useEffect(() => {
    setProduct(null);
    getProduct(currentPath, productId as string)
      .then(productS => setProduct(productS))
      .catch()
      .finally();
  }, [productId, currentPath]);

  const numericID = 3587941;

  if (!product) {
    return <Loader />;
  }

  function slitCapacity(capacity: string): string {
    let capacityString = '';

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < capacity.length; i++) {
      if (capacity[i].toUpperCase() === capacity[i].toLowerCase()) {
        capacityString += capacity[i];
      } else {
        capacityString += ' ';
        capacityString += capacity.slice(i);
        break;
      }
    }
    return capacityString;
  }

  function getNewLink(id: string, newParam: string, prevParam: string): string {
    const newLink = id.toLowerCase().replace(prevParam.toLowerCase(), newParam.toLowerCase());

    return newLink;
  }

  return (
    <section className="product-page">

      {state?.prevPath ? (
        <Link to={state.prevPath} className="product-page__back-link">
          <IconLeft />
          {`Back to ${state.prevPath.replaceAll('/', '')}`}
        </Link>
      ) : (
        <Link to={`/${currentPath}`} className="product-page__back-link">
          <IconLeft />
          Back
        </Link>
      )}
      <h2 className="product-page__title">{product.name}</h2>

      <div className="product-page__info">
        <div className="product-page__images">
          <SelectImage product={product} />
        </div>

        <div className="product-page__settings">

          <div className="product-page__settings-group">
            <div className="product-page__colors">
              <div className="colors__header">
                <span className="product-page__settings-title">Available colors</span>
                <span className="product-page__id id--on-mobile">{`ID: ${numericID}`}</span>
              </div>

              <ul className="product-page__settings-list">
                {product.colorsAvailable.map(colorS => {
                  const color = colorS.replaceAll(' ', '-');
                  const currentColor = product.color.replaceAll(' ', '-');
                  const link = getNewLink(product.id, color, currentColor);

                  return (
                    <li key={color} className="product-page__color-link">
                      <ColorLink
                        to={`/${currentPath}/${link}`}
                        color={color.replaceAll('-', '')}
                        selected={productId?.includes(color)}
                      />
                    </li>
                  );
                })}
              </ul>

              <hr />
            </div>

            <div className="product-page__capacity">
              <span className="product-page__settings-title">Select capacity</span>

              <ul className="product-page__settings-list">
                {product.capacityAvailable.map(capacity => {
                  const splittedCapacity = slitCapacity(capacity);
                  const link = `/${currentPath}/${getNewLink(product.id, capacity, product.capacity)}`;

                  return (
                    <li key={capacity}>
                      <OptionLink
                        to={link.toLowerCase()}
                        capacity={splittedCapacity}
                        selected={productId?.includes(capacity.toLowerCase())}
                      />
                    </li>
                  );
                })}
              </ul>

              <hr />
            </div>
          </div>

          <div className="product-page__settings-group">
            <div className="card__price-text">
              {product.priceDiscount}
              <span className="card__price-text--crossed">
                {product.priceRegular}
                <div className="card__cross-line" />
              </span>
            </div>

            <div className="card__submit-container">
              <button
                className="card__button-submit"
                onClick={() => handleProductInCart(product, currentPath)}
              >
                Add to cart
              </button>

              <button
                className="card__make-favorite"
              /* onClick={() => handleFavorite(product)} */
              >
                <img
                  className="card__make-favorite-img"
                  src={emptyHeart}
                  alt="Make favorite"
                />
              </button>
            </div>
          </div>

          <SpecsList specs={getSpecsList(product, SPECS_SHORT)} boldValue className="text-s-12" />
        </div>
        <span className="product-page__id text-s-12 id--on-desktop">{`ID: ${numericID}`}</span>
        <div className="product-page__about">
          <h3>
            <p className="product-page__specs-title">About</p>
            <hr />
          </h3>

          {product.description.map((description) => (
            <React.Fragment key={description.title}>
              <h4>{description.title}</h4>
              {description.text.map(p => (
                <p className="text-gray" key={p}>{p}</p>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="product-page__specs">
          <h3>
            <p className="product-page__specs-title">Tech specs</p>
            <hr />
          </h3>

          <SpecsList specs={getSpecsList(product, SPECS_LONG)} />
        </div>
      </div>
    </section>
  );
};
