/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SpecsList } from '../SpecsList';
import { Product } from '../../types/Product';
import { getSpecsList } from '../../utils/getSpecsList';

interface Props {
  product: Product;
  inCart?: boolean;
  isFavorite?: boolean;
  category: string;
  specsList: string[];
  onBtnClick: (...args: any[]) => void;
  onFavClick:(...args: any[]) => void;
}

export const ProductShorts: React.FC<Props> = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { category, inCart = false, product, isFavorite = false, specsList } = props;

  return (
    <div>
      <div className="card__price-text">
        {`$${product.priceDiscount}`}
        <span className="card__price-text--crossed">
          {`$${product.priceRegular}`}
          <div className="card__cross-line" />
        </span>
      </div>

      <div className="card__just-line" />

      <SpecsList
        specs={getSpecsList(product, specsList)}
        boldValue
      />
    </div>
  );
};
