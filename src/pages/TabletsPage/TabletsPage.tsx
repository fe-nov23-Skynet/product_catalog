import { Select } from '../../components/Select/Select';
import tablets from '../../productApi/tablets.json';
import { Catalog } from '../Catalog';
import Styles from './Tablets.module.scss';

export const TabletsPage: React.FC = () => {
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

  const phonesArr = tablets;
  phonesArr.length = 20;

  return (
    <div className={Styles.tablets_page}>
      <h1 className={Styles.tablets_page__title}>Tablets</h1>
      <span className={Styles.tablets_page__info}>{`${phonesArr.length} models`}</span>

      <Select options={sortBy} className={Styles.tablets_page__sort} />
      <Select options={itemsOnPage} className={Styles.tablets_page__itemsOnPage} />

      <Catalog products={phonesArr} />
    </div>
  );
};
