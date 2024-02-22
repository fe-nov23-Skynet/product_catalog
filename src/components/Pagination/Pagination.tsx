import React, { useState } from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

interface Props {
  total: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  className: string;
}

export const ITEMS_PER_PAGE = 10;

export const PaginationBlock: React.FC<Props> = ({
  total,
  currentPage,
  setCurrentPage,
  className,
}) => (
  <Pagination
    className={className}
    current={currentPage}
    total={total}
    pageSize={ITEMS_PER_PAGE}
    onChange={setCurrentPage}
  />
);
