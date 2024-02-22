/* eslint-disable max-len */
import { Select } from '../../components/Select/Select';
import accessories from '../../productApi/accessories.json';
import { Catalog } from '../Catalog';
import Styles from './AccessoriesPage.module.scss';

export const AccessoriesPage: React.FC = () => {
  const accessoriesArr = accessories;

  return (
    <div className={Styles.accessories_page}>
      <h1 className={Styles.accessories_page__title}>Tablets</h1>
      <span className={Styles.accessories_page__info}>{`${accessoriesArr.length} models`}</span>

      <Catalog products={accessoriesArr} />
    </div>
  );
};
