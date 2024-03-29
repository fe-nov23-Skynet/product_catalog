import { Link, useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { sha256 } from 'hash.js';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Product } from '../../types/Product';

import { SpecsList } from '../../components/SpecsList';
import { Loader } from '../../components/Loader';
import { ReactComponent as IconLeft } from '../../styles/icons/chevron_arrow_left.svg';
import { getSpecsList } from '../../utils/getSpecsList';
import { getProduct } from '../../api/api';
import { SelectImage } from '../../components/SelectImage/SelectImage';
import { ColorLink } from '../../components/UI/ColorLink';
import { useCartState } from '../../customHooks/useCartState';
import { OptionLink } from '../../components/UI/OptionLink';
import { CartButton } from '../../components/Buttons/CartButton/CartButton';
import { FavoriteButton } from '../../components/Buttons/FavoriteButton/FavoriteButton';
import { useFavoriteState } from '../../customHooks/useFavoriteState';
import { CopyButton } from '../../components/UI/CopyButton';

import './productPage.scss';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { useTranslate } from '../../customHooks/useTranslate';
import fetchAxiosData from '../../api/axiosClient';

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

function generateUniqueId(inputString: string): number {
  const hash = sha256().update(inputString).digest('hex');
  const numericHash = parseInt(hash, 16);
  return numericHash % 10000000;
}

export const ProductPage: React.FC = () => {
  const currentPath = useLocation().pathname.split('/')[1];
  const { state } = useLocation();
  const { id: productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line object-curly-newline
  const { cartProducts, addToCart } = useCartState();
  const { addToFavorites, removeFromFavorites, favoritesProducts } = useFavoriteState();

  const { t } = useTranslation();
  const { LanguageState } = useTranslate();
  const currency = LanguageState.language === 'en' ? '$' : '₴';

  let currPrice = 0;
  let oldPrice = 0;

  if (product) {
    currPrice = LanguageState.language === 'en' ? product?.priceDiscount : Math.ceil(product.priceDiscount * 38.5);
    oldPrice = LanguageState.language === 'en' ? product?.priceRegular : product.priceRegular * 40;
  }

  function saveLoadedProduct(productToSave: Product | null): void {
    setProduct(productToSave);
    setLoading(false);
  }

  function catchError(e: string) {
    toast.error('Couldn`t load product, check your internet connection.');
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);

    getProduct(currentPath, productId as string)
      .then(saveLoadedProduct)
      .catch(catchError)
      .finally();
  }, [productId, currentPath]);

  const numericID = product ? generateUniqueId(product.id) : '0000000';

  const pageTitle = `${product?.name} - Nice Gadgets Store`;

  const pageDescription = `Explore ${product?.name} at Nice Gadgets store. Find out more about its features and specifications.`;

  const pageUrl = `https://example.com/products/${product?.id}`;

  const imageUrl = product?.images[0] || '/img/category-accessories.png';

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
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="product.item" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      {loading && <Loader />}
      {state?.prevPath ? (
        <Link to={state.prevPath} className="product-page__back-link">
          <IconLeft />
          {`${t('productPage.back')} ${state.prevPath.replaceAll('/', '')}`}
        </Link>
      ) : (
        <Link to={`/${currentPath}`} className="product-page__back-link">
          <IconLeft />
          {t('productPage.back').split(' ')[0]}
        </Link>
      )}
      {product && (
        <>
          <h2 className="product-page__title">{product.name}</h2>

          <div className="product-page__info">
            <div className="product-page__images" data-aos="fade-right">
              <SelectImage product={product} />
            </div>

            <div className="product-page__settings" data-aos="fade-left">

              <div className="product-page__settings-group">
                <div className="product-page__colors">
                  <div className="colors__header">
                    <span className="product-page__settings-title">{t('productPage.available')}</span>
                    <span className="product-page__id text-s-12 id--on-mobile">
                      {`ID: ${numericID}`}
                      <CopyButton text={`${numericID}`} /* className="text-s-12" */ />
                    </span>
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
                            selected={productId?.includes(`-${color}`)}
                          />
                        </li>
                      );
                    })}
                  </ul>

                  <hr />
                </div>

                <div className="product-page__capacity">
                  <span className="product-page__settings-title">{t('productPage.selectCap')}</span>

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
                <div className="product-page__price">
                  <span className="product-page__price-current">
                    {`${currency}${currPrice}`}
                    <span className="product-page__price-old">
                      {`${currency}${oldPrice}`}
                    </span>
                  </span>
                  <hr />
                </div>

                <div className="product-page__buttons">
                  <CartButton
                    onClick={() => addToCart(product, currentPath)}
                    active={cartProducts.some(({ id }) => id === product.id)}
                  />

                  <FavoriteButton
                    onClickAdd={() => addToFavorites(product, currentPath)}
                    onClickRemove={() => removeFromFavorites(product)}
                    active={favoritesProducts.some(({ id }) => id === product.id)}
                  />
                </div>
              </div>

              <SpecsList specs={getSpecsList(product, SPECS_SHORT)} boldValue className="text-s-12" />
            </div>
            <span
              className="product-page__id text-s-12 id--on-desktop"
              data-aos="fade-left"
            >
              {`ID: ${numericID}`}
              <CopyButton text={`${numericID}`} />
            </span>

            <div className="product-page__about" data-aos="fade-up">
              <h3>
                <p className="product-page__specs-title">{t('productPage.about')}</p>
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
            <div className="product-page__specs" data-aos="fade-up">
              <h3>
                <p className="product-page__specs-title">{t('productPage.specs')}</p>
                <hr />
              </h3>

              <SpecsList specs={getSpecsList(product, SPECS_LONG)} />
            </div>
          </div>
        </>

      )}
      {!product && !loading && (
        <NotFoundPage
          tittle={t('notFound.product')}
          text={t('notFound.checkPath')}
        />
      )}
    </section>
  );
};
