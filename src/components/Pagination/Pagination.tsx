import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import './PaginationStyle.scss';

interface Props {
  total: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  className?: string;
  itemsPerPage: number;
}

export const PaginationBlock: React.FC<Props> = ({
  total,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) => (
  <Pagination
    current={currentPage}
    total={total}
    pageSize={itemsPerPage}
    onChange={setCurrentPage}
  />
);
