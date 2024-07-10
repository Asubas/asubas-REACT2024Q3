import './pagination.scss';
import { useContext, useLayoutEffect, useState } from 'react';
import { fetchData } from '../../api/requestApi';
import { IPageContextInterface } from '../../interfaces/pageContextInterface';
import { DetailsContext, PageContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingSnippet } from '../loadingSnippet/loadingSnippet';
import { IDetailSectionContext } from '../../interfaces/detailsSectionInterfaces';

function Pagination() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = 10;
  const { setState } = useContext<IPageContextInterface>(PageContext);
  const { setDetailId } = useContext<IDetailSectionContext>(DetailsContext);
  const navigate = useNavigate();

  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    setState(await fetchData(0, page));
    navigate(`/page${page}`);
    setIsLoading(false);
    setDetailId('');
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
  const { pageNumber } = useParams();
  useLayoutEffect(() => {
    setCurrentPage(Number(pageNumber) ? Number(pageNumber) : 0);
  }, [pageNumber]);

  return (
    <>
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
      {isLoading && <LoadingSnippet />}
    </>
  );
}

export { Pagination };
