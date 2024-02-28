/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Catalog } from '../Catalog';
import Styles from './Tablets.module.scss';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';

export const TabletsPage: React.FC = () => {
  const currentPath = useLocation().pathname.split('/')[1];
  const [tabletsArr, setTabletsArr] = useState<Product[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getProducts(currentPath)
      .then(products => setTabletsArr(products));
  }, []);

  return (
    <div className={Styles.tablets_page}>
      <h1 className={Styles.tablets_page__title}>{t('tablets.tablets')}</h1>
      <span className={Styles.tablets_page__info}>{`${tabletsArr.length} ${t('tablets.models')}`}</span>

      {tabletsArr.length === 0 ? (
        <Loader />
      ) : (
        <Catalog products={tabletsArr} />
      )}
    </div>
  );
};
