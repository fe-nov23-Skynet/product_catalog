/* eslint-disable object-curly-newline */
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import './DropdownInput.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReactComponent as SearchIcon } from './searchIcon.svg';
import { ReactComponent as CloseIcon } from '../../styles/icons/close.svg';
import { debounce } from '../../utils/debounce';
import { filterProducts, filterProductsAgain } from '../../utils/filterProducts';

import { Product } from '../../types/Product';

import { ShortProduct } from '../../types/ShortProduct';
import { getShortProducts } from '../../api/api';

interface Props {
  onSelect: (p: Product) => void;
}

export const DropdownInput: React.FC/* <Props> */ = (/* { onSelect } */) => {
  const [isFocused, setIsFocused] = useState(false);
  const [querry, setQuerry] = useState('');
  const [delayedQerry, setDelayedQerry] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ShortProduct[]>([]);
  const showList = products.length > 0 && delayedQerry;
  const delay = 500;

  const { t } = useTranslation();

  useEffect(() => {
    if (delayedQerry) {
      getShortProducts('products')
        .then((p) => setProducts(p));
    }
  }, [delayedQerry]);

  const handleQuerry = useCallback(debounce(setDelayedQerry, delay), [delay]);

  const visibleProducts = filterProducts(products, delayedQerry).length > 0
    ? filterProducts(products, delayedQerry)
    : filterProductsAgain(products, delayedQerry);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setQuerry(event.target.value);
    handleQuerry(event.target.value);
  }

  const stopSearch = () => {
    setProducts([]);
    setQuerry('');
    setDelayedQerry('');
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        stopSearch();
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="searchSection" ref={rootRef}>
      <input
        type="text"
        placeholder={t('search.placeHolder')}
        className="search-input"
        value={querry}
        onChange={handleInput}
        onFocus={() => setIsFocused(true)}
      />

      {querry === '' ? (<SearchIcon className="search-icon" />)
        : (
          <CloseIcon
            className="removeSearch-icon"
            onClick={() => setQuerry('')}
          />
        )}

      {isFocused && showList && (
        <ul className="dropdown-content">
          {visibleProducts.length < 1 && (
            <li className="search__product">{t('search.notFound')}</li>
          )}

          {visibleProducts.length > 0 && visibleProducts.map(
            product => (
              <li className="search__product">
                <Link
                  to={`/${product.category}/${product.itemId}`}
                  onClick={stopSearch}
                  className="search__link"
                >
                  <img className="search__product-img" src={`/${product.image}`} alt={product.name} />
                  {product.name}
                </Link>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
};
