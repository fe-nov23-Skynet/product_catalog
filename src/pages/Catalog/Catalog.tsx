import { useState } from 'react';
import 'rc-pagination/assets/index.css';
import { Select } from '../../components/Select/Select';
import Styles from './Catalog.module.scss';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { PaginationBlock, ITEMS_PER_PAGE } from '../../components/Pagination/Pagination';

interface Props {
  products: Product[];
}

export const Catalog: React.FC<Props> = ({ products }) => {
  const a = 0;

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex: number = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex: number = startIndex + ITEMS_PER_PAGE;
  const visibleData: Product[] = products.slice(startIndex, endIndex);

  return (
    <>
      <ul className={Styles.catalog__list}>
        {visibleData.map(
          product => (
            <ProductCard
              product={product}
              className={Styles.catalog__product}
              key={product.id}
            />
          ),
        )}
      </ul>
      <div className={Styles.catalog__paginationWrapper}>
        <PaginationBlock
          className={Styles.catalog__customPagination}
          currentPage={currentPage}
          total={products.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};
