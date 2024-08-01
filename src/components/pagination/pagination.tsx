import './pagination.scss';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setDetails } from '../../app/slices/detailsSlice';
import { useRouter } from 'next/router';

function Pagination() {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePageChange = useCallback(
    async (page: number) => {
      setCurrentPage(page);
      router.push(`/page${page}`);
      dispatch(setDetails(''));
    },
    [dispatch, router],
  );

  const handlePageChangeClick = (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handlePageChange(index);
  };

  const handlePrevPage = () => {
    if (currentPage !== 0) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < 9) {
      handlePageChange(currentPage + 1);
    }
  };

  useEffect(() => {
    const { asPath } = router;
    const currentPageInUrl = asPath.split('page')[1] || '0';

    setCurrentPage(Number(currentPageInUrl));
  }, [router]);

  return (
    <>
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          className={`pageNumber ${currentPage === 0 && 'noActive'}`}
        >
          -
        </button>
        {[...Array(10)].map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={handlePageChangeClick(index)}
            className={`pageNumber ${currentPage === index && 'active'}`}
          >
            {index}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={`pageNumber ${currentPage === 9 && 'noActive'}`}
        >
          +
        </button>
      </div>
    </>
  );
}

export { Pagination };
