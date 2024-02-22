import { Select } from '../../components/Select/Select';
import phones from '../../productApi/phones.json';
import { Catalog } from '../Catalog';
import Styles from './Phones.module.scss';

export const PhonesPage: React.FC = () => {
  /* const id = use */
  const sortBy = [
    { value: 1, title: 'Price low' },
    { value: 4, title: 'Price high' },
    { value: 2, title: 'Newest' },
    { value: 3, title: 'Oldest' },
  ];

  const itemsOnPage = [
    { value: 1, title: '1' },
    { value: 2, title: '2' },
    { value: 3, title: '3' },
    { value: 4, title: '4' },
  ];

  const phonesArr = phones;
  phonesArr.length = 6;

  return (
    <div className={Styles.phones_page}>
      <h1 className={Styles.phones_page__title}>Mobile Phones</h1>
      <span className={Styles.phones_page__info}>{`${phonesArr.length} models`}</span>

      <Select title="Sort by" options={sortBy} className={Styles.phones_page__sort} />
      <Select title="Items on page" options={itemsOnPage} className={Styles.phones_page__itemsOnPage} />

      <Catalog products={phonesArr} />
    </div>
  );
};
