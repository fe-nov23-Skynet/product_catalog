import { Select } from '../../components/Select/Select';
import Styles from './Catalog.module.scss';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Product } from '../../types/Product';

interface Props {
  products: Product[];
}

export const Catalog: React.FC<Props> = ({ products }) => {
  const a = 0;

  return (
    <ul className={Styles.catalog__list}>
      {products.map(
        product => (
          <ProductCard
            product={product}
            className={Styles.catalog__product}
            key={product.id}
          />
        ),
      )}
    </ul>
  );
};
