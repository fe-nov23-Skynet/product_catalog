/* eslint-disable indent */
import { useState } from 'react';
import 'rc-pagination/assets/index.css';
import { Select, SelectOption } from '../../components/Select/Select';
import Styles from './Catalog.module.scss';
import { ProductCard } from '../../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { PaginationBlock } from '../../components/Pagination/Pagination';
import { useLocalStorage } from '../../customHooks/useLocalStorage';

interface Props {
  products: Product[];
}

export const Catalog: React.FC<Props> = ({ products }) => {
  const a = 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useLocalStorage<SelectOption>('itemsPerPage', { value: 20, title: '12' });
  const [sortedBy, setSortedBy] = useLocalStorage<SelectOption>('sortedBy', { value: 'price-low', title: 'Price low' });

  const sortBy = [
    { value: 'price-low', title: 'Price low' },
    { value: 'price-high', title: 'Price high' },
    { value: 'newest', title: 'Newest' },
    { value: 'oldest', title: 'Oldest' },
  ];

  const itemsOnPage = [
    { value: 5, title: '6' },
    { value: 20, title: '12' },
    { value: 30, title: '25' },
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

  const phonesArr = handleSortBy(sortedBy.value.toString()) || products;

  const startIndex: number = (currentPage - 1) * +itemsPerPage.value;
  const endIndex: number = startIndex + +itemsPerPage.value;
  const visibleData: Product[] = phonesArr.slice(startIndex, endIndex);

  return (
    <>
      {phonesArr.length > +itemsPerPage.value && (
        <>
          <Select
            title="Sort by"
            options={sortBy}
            selectedOption={sortedBy}
            className={Styles.catalog__sort}
            onSelect={(option) => {
              setSortedBy(option);
            }}
          />
          <Select
            title="Items on page"
            options={itemsOnPage}
            selectedOption={itemsPerPage}
            className={Styles.catalog__itemsOnPage}
            onSelect={(option) => {
              setItemPerPage(option);
            }}
          />
        </>
      )}

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
      {phonesArr.length > +itemsPerPage.value && (
        <div className={Styles.catalog__paginationWrapper}>
          <PaginationBlock
            className={Styles.catalog__customPagination}
            currentPage={currentPage}
            total={products.length}
            setCurrentPage={setCurrentPage}
            itemsPerPage={+itemsPerPage.value}
          />
        </div>
      )}
    </>
  );
};
