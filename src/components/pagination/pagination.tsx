import './pagination.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingSnippet } from '../loadingSnippet/loadingSnippet';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../app/slices/dataSlice';
import { useFetchImagesQuery } from '../../app/slices/apiSlice';
import { RootState } from '../../app/store';
import { setDetails } from '../../app/slices/detailsSlice';

function Pagination() {
  const [currentPage, setCurrentPage] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const totalPages = 10;
  const isPagination = useSelector((state: RootState) => state.rootReducer.reset);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { data, isLoading } = useFetchImagesQuery({ searchRequest: 0, page: currentPage });
  const handlePageChange = async (page: number) => {
    // console.log(isLoading);
    // setIsLoading(true);
    setCurrentPage(page);
    dispatch(setData());
    navigate(`/page${page}`);
    // setIsLoading(false);
    dispatch(setDetails(''));
  };

  const handlePrevPage = () => {
    if (currentPage !== 0) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handlePageChange(currentPage + 1);
    }
  };
  const { pathname } = useLocation();
  const numberPage = pathname.split('page')[1];
  useEffect(() => {
    setCurrentPage(Number(numberPage) ? Number(numberPage) : 0);
  }, [numberPage]);

  return (
    <>
      {isPagination ? (
        <div className="pagination">
          <button
            onClick={handlePrevPage}
            className={`pageNumber ${currentPage === 0 && 'noActive'}`}
          >
            -
          </button>
          {[...Array(totalPages)].map((_, index) => (
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
            className={`pageNumber ${currentPage === totalPages - 1 && 'noActive'}`}
          >
            +
          </button>
        </div>
      ) : (
        <div></div>
      )}
      {/* {isLoading && <LoadingSnippet />} */}
    </>
  );
}

export { Pagination };
