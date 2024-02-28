/* eslint-disable object-curly-newline */
import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './DropdownInput.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as SearchIcon } from './searchIcon.svg';
import { ReactComponent as Close } from '../../styles/icons/close.svg';
import { debounce } from '../../utils/debounce';
import { filterProducts, filterProductsAgain } from '../../utils/filterProducts';

import { Product } from '../../types/Product';

import { ShortProduct } from '../../types/ShortProduct';
import { getShortProducts } from '../../api/api';

interface Props {
  setIsSearchOpened: (arg: boolean) => void;
  isSearchOpened: boolean;
}

export const DropdownInput: React.FC<Props> = ({ isSearchOpened, setIsSearchOpened }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [querry, setQuerry] = useState('');
  const [delayedQerry, setDelayedQerry] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ShortProduct[]>([]);
  const showList = /* querry === delayedQerry && */ products.length > 0 && delayedQerry;
  const delay = 500;

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
        placeholder="Enter search string"
        className={classNames('search-input', { 'open-input': isSearchOpened })}
        value={querry}
        onChange={handleInput}
        onFocus={() => setIsFocused(true)}
      />
      {isSearchOpened ? (
        <Close
          className={classNames('search-icon', { 'open-search': isSearchOpened })}
          onClick={() => setIsSearchOpened(!isSearchOpened)}
        />
      ) : (
        <SearchIcon
          className={classNames('search-icon', { 'open-search': isSearchOpened })}
          onClick={() => setIsSearchOpened(!isSearchOpened)}
        />
      )}

      {isFocused && showList && (
        <ul className="dropdown-content">
          {visibleProducts.length < 1 && (
            <li className="search__product">No results found</li>
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
