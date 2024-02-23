/* eslint-disable arrow-body-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Select } from '../../components/Select/Select';
import phones from '../../productApi/phones.json';
import { Catalog } from '../Catalog';
import Styles from './Phones.module.scss';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';

export const PhonesPage: React.FC = () => {
  const currentPath = useLocation().pathname.split('/')[1];
  const [phonesArr, setPhonesArr] = useState<Product[]>([]);

  useEffect(() => {
    getProducts(currentPath)
      .then(products => setPhonesArr(products));
  }, []);

  return (
    <div className={Styles.phones_page}>
      <h1 className={Styles.phones_page__title}>Mobile Phones</h1>
      <span className={Styles.phones_page__info}>{`${phonesArr.length} models`}</span>

      {phonesArr.length === 0 ? (
        <Loader />
      ) : (
        <Catalog products={phonesArr} />
      )}
    </div>
  );
};
