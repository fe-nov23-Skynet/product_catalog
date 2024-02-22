import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { useState } from 'react';

interface Props {
  total: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  className: string;
  itemsPerPage: number;
}

// export const ITEMS_PER_PAGE = 10;

export const PaginationBlock: React.FC<Props> = ({
  total,
  currentPage,
  setCurrentPage,
  className,
  itemsPerPage,
}) => (
  <Pagination
    className={className}
    current={currentPage}
    total={total}
    pageSize={itemsPerPage}
    onChange={setCurrentPage}
  />
);
