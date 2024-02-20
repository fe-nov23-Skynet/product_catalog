import { Select } from '../../components/Select/Select';
import accessories from '../../productApi/accessories.json';
import { Catalog } from '../Catalog';
import Styles from './AccessoriesPage.module.scss';

export const AccessoriesPage: React.FC = () => {
  const sortBy = [
    { value: 1, title: 'Price low' },
    { value: 4, title: 'Price high' },
    { value: 2, title: 'Newest' },
    { value: 3, title: 'Oldest' },
  ];

  const itemsOnPage = [
    { value: 10, title: '10' },
    { value: 20, title: '20' },
    { value: 30, title: '30' },
    { value: 40, title: '40' },
  ];

  const accessoriesArr = accessories;
  accessoriesArr.length = 15;

  return (
    <div className={Styles.accessories_page}>
      <h1 className={Styles.accessories_page__title}>Tablets</h1>
      <span className={Styles.accessories_page__info}>{`${accessoriesArr.length} models`}</span>

      <Select options={sortBy} className={Styles.accessories_page__sort} />
      <Select options={itemsOnPage} className={Styles.accessories_page__itemsOnPage} />

      <Catalog products={accessoriesArr} />
    </div>
  );
};
