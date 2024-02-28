/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Catalog } from '../Catalog';
import Styles from './AccessoriesPage.module.scss';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';

export const AccessoriesPage: React.FC = () => {
  const currentPath = useLocation().pathname.split('/')[1];
  const [accessoriesArr, setAccessoriesArr] = useState<Product[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getProducts(currentPath)
      .then(products => setAccessoriesArr(products));
  }, []);

  return (
    <div className={Styles.accessories_page}>
      <h1 className={Styles.accessories_page__title}>{t('accessories.accessories')}</h1>
      <span className={Styles.accessories_page__info}>{`${accessoriesArr.length} ${t('accessories.models')}`}</span>

      {accessoriesArr.length === 0 ? (
        <Loader />
      ) : (
        <Catalog products={accessoriesArr} />
      )}
    </div>
  );
};
