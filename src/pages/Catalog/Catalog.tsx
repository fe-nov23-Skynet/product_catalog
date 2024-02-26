/* eslint-disable indent */
import { useState } from 'react';
import 'rc-pagination/assets/index.css';
import { Select } from '../../components/Select/Select';
import Styles from './Catalog.module.scss';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { PaginationBlock } from '../../components/Pagination/Pagination';

interface Props {
  products: Product[];
}

export const Catalog: React.FC<Props> = ({ products }) => {
  const a = 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [sortedBy, setSortedBy] = useState('');

  const sortBy = [
    { value: 'price-low', title: 'Price low' },
    { value: 'price-high', title: 'Price high' },
    { value: 'newest', title: 'Newest' },
    { value: 'oldest', title: 'Oldest' },
  ];

  const itemsOnPage = [
    { value: 5, title: '5' },
    { value: 20, title: '20' },
    { value: 30, title: '30' },
    { value: 50, title: '50' },
  ];

  const handleSortBy = (value: string) => {
    const sortedphonesArr = [...products];

    sortedphonesArr.sort((item1, item2) => {
      switch (value) {
        case 'price-low':
          return item1.priceDiscount - item2.priceDiscount;
        case 'price-high':
          return item2.priceDiscount - item1.priceDiscount;
        case 'newest':
          return (+item1.id) - (+item2.id);
        case 'oldest':
          return (+item1.id) - (+item2.id);
        default:
          return 0;
      }
    });

    return sortedphonesArr;
  };

  const phonesArr = handleSortBy(sortedBy) || products;

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const visibleData: Product[] = phonesArr.slice(startIndex, endIndex);

  return (
    <>
      <Select
        title="Sort by"
        options={sortBy}
        className={Styles.catalog__sort}
        onSelect={(value) => {
          setSortedBy(value.toString());
        }}
      />
      <Select
        title="Items on page"
        options={itemsOnPage}
        className={Styles.catalog__itemsOnPage}
        onSelect={(value) => {
          setItemPerPage(+value);
        }}
      />
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
          itemsPerPage={itemsPerPage}
        />
      </div>
    </>
  );
};
