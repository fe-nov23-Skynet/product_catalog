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
}) => {
  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Pagination
      current={currentPage}
      total={total}
      pageSize={itemsPerPage}
      onChange={(event) => {
        setCurrentPage(event);
        handleScrollUp();
      }}
    />
  );
};
