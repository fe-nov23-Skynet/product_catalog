import { Select } from '../../components/Select/Select';
import Styles from './Catalog.module.scss';
import phones from '../../productApi/phones.json';
import { ProductCard } from '../../ProductCard/ProductCard';

export const Catalog: React.FC = () => {
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
  phonesArr.length = 8;

  return (
    <div className={Styles.catalog}>
      <h1 className={Styles.catalog__title}>Mobile Phones</h1>
      <span className={Styles.catalog__info}>95 models</span>

      {/* <div className={Styles.catalog__settings}> */}
      <Select options={sortBy} className={Styles.catalog__sort} />
      <Select options={itemsOnPage} className={Styles.catalog__itemsOnPage} />
      {/* </div> */}

      <div className={Styles.catalog__list}>
        {phonesArr.map(
          phone => <ProductCard product={phone} className={Styles.catalog__product} />,
        )}
      </div>
    </div>
  );
};
