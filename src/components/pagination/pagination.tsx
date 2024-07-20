import './pagination.scss';
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDetails } from '../../app/slices/detailsSlice';

function Pagination() {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePageChange = useCallback(
    async (page: number) => {
      setCurrentPage(page);
      navigate(`/page${page}`);
      dispatch(setDetails(''));
    },
    [dispatch, navigate],
  );

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

  const { pathname } = useLocation();
  let numberPage = pathname.split('page')[1];
  if (!Number(numberPage)) numberPage = numberPage.split('/')[0];

  useEffect(() => {
    setCurrentPage(Number(numberPage) ? Number(numberPage) : 0);
  }, [dispatch, numberPage]);

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
            onClick={() => handlePageChange(index)}
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
