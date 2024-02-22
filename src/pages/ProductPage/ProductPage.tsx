import { Link, useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../types/Product';
import emptyHeart from '../../styles/icons/favourites_heart_like.svg';
import './productPage.scss';

import { SpecsList } from '../../components/SpecsList';
import { Loader } from '../../components/Loader';
import { ReactComponent as IconLeft } from '../../styles/icons/chevron_arrow_left.svg';
import { getSpecsList } from '../../utils/getSpecsList';
import { getProduct } from '../../api/api';
import { SelectImage } from '../../components/SelectImage/SelectImage';
import { RootState } from '../../redux/store';
import { addProduct, removeProduct } from '../../features/cartSlice';
import { addFavoriteProduct, removeFavoriteProduct } from '../../features/favoritesSlice';

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
const SPECS_SHORT = [
  'screen',
  'resolution',
  'processor',
  'ram',
];

export const ProductPage: React.FC/* <Props> */ = (/* props */) => {
  const currentPath = useLocation().pathname.split('/')[1];
  const { id: productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  const cart = useSelector((state: RootState) => state.cart.cartProducts);
  const dispatch = useDispatch();
  const addProductToCart = (productToAdd: Product) => {
    dispatch(addProduct(productToAdd));
  };
  const removeProductFromCart = (productToAdd: Product) => {
    dispatch(removeProduct(productToAdd));
  };

  const favorites = useSelector((state: RootState) => state.favorites.favoritesProducts);

  const addProductToFavorites = (productToAdd: Product) => {
    dispatch(addFavoriteProduct(productToAdd));
  };
  const removeProductFromFavorites = (productToAdd: Product) => {
    dispatch(removeFavoriteProduct(productToAdd));
  };

  function handleAddtoCart(productToHandle: Product) {
    if (cart.some(({ id }) => id === productToHandle.id) && product) {
      removeProductFromCart(productToHandle);
    } else {
      addProductToCart(productToHandle);
    }
  }
  function handleFavorite(productToHandle: Product) {
    if (favorites.some(({ id }) => id === productToHandle.id) && product) {
      removeProductFromFavorites(productToHandle);
    } else {
      addProductToFavorites(productToHandle);
    }
  }

  useEffect(() => {
    getProduct(currentPath, productId as string)
      .then(productS => setProduct(productS))
      .catch()
      .finally();
  }, []);

  const numericID = 3587941;

  if (!product) {
    return <Loader />;
  }

  return (
    <section className="product-page">
      <Link to={`/${currentPath}`} className="product-page__back-link">
        <IconLeft />
        Back
      </Link>
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
                <li key={1}><input type="radio" /></li>
                <li key={2}><input type="radio" /></li>
                <li key={3}><input type="radio" /></li>
                <li key={4}><input type="radio" /></li>
              </ul>

              <hr />
            </div>

            <div className="product-page__capacity">
              <span className="product-page__settings-title">Select capacity</span>

              <ul className="product-page__settings-list">
                {product.capacityAvailable.map(capacity => (
                  <li key={capacity}>
                    <input type="radio" />
                    {`${capacity}`}
                  </li>
                ))}
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
                onClick={() => handleAddtoCart(product)}
              >
                Add to cart
              </button>

              <button
                className="card__make-favorite"
                onClick={() => handleFavorite(product)}
              >
                <img
                  className="card__make-favorite-img"
                  src={emptyHeart}
                  alt="Make favorite"
                />
              </button>
            </div>
          </div>

          <SpecsList specs={getSpecsList(product, SPECS_SHORT)} boldValue />
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

          <SpecsList specs={getSpecsList(product, SPECS_SHORT)} />
        </div>
      </div>
    </section>
  );
};
