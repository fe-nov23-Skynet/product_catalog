/* eslint-disable max-len */
import tablets from '../../productApi/tablets.json';
import { Catalog } from '../Catalog';
import Styles from './Tablets.module.scss';

export const TabletsPage: React.FC = () => {
  const phonesArr = tablets;
  phonesArr.length = 20;

  return (
    <div className={Styles.tablets_page}>
      <h1 className={Styles.tablets_page__title}>Tablets</h1>
      <span className={Styles.tablets_page__info}>{`${phonesArr.length} models`}</span>

      <Catalog products={phonesArr} />
    </div>
  );
};
