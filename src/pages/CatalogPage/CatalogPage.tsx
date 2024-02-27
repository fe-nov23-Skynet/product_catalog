import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';
import { Loader } from '../../components/Loader';
import { Catalog } from '../Catalog/Catalog';
import './catalogPage.scss';

interface Props {
  pageTitle: string;
}

export const CatalogPage: React.FC<Props> = ({ pageTitle }) => {
  const currentPath = useLocation().pathname.split('/')[1];
  const [productsArray, setProductsArray] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  function saveLoadedProducts(productsToSave: Product[]): void {
    setProductsArray(productsToSave);
    setLoading(false);
  }

  useEffect(() => {
    // setProductsArray([]);
    setLoading(true);
    getProducts(currentPath)
      .then(saveLoadedProducts);
  }, [currentPath]);

  return (
    <div className="catalog-page">
      <Helmet>
        <title>{pageTitle.toUpperCase()}</title>
      </Helmet>

      <h1 className="catalog-page__title">{pageTitle}</h1>
      <span className="catalog-page__info">{`${productsArray.length} models`}</span>
      {loading && <Loader />}
      {loading ? (
        <Loader />
      ) : (
        <Catalog products={productsArray} />
      )}
    </div>
  );
};
