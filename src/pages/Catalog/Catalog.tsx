import { Select } from '../../components/Select/Select';
import Styles from './Catalog.module.scss';

export const Catalog: React.FC = () => {
  const sortBy = [
    { value: 1, title: '1' },
    { value: 2, title: '2' },
    { value: 3, title: '3' },
    { value: 4, title: '4' },
  ];

  const itemsOnPage = [
    { value: 1, title: '1' },
    { value: 2, title: '2' },
    { value: 3, title: '3' },
    { value: 4, title: '4' },
  ];

  return (
    <>
      <h1 className={Styles.catalog__title}>Mobile Phones</h1>
      <span className={Styles.catalog__info}>95 models</span>

      {/* <div className={Styles.catalog__settings}> */}
      <Select options={sortBy} className={Styles.catalog__sort} />
      <Select options={itemsOnPage} className={Styles.catalog__itemsOnPage} />
      {/* </div> */}
    </>
  );
};
