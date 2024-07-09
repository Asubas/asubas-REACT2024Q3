import './pagination.scss';
import { useContext, useLayoutEffect, useState } from 'react';
import { fetchData } from '../../api/requestApi';
import { IPageContextInterface } from '../../interfaces/pageContextInterface';
import { DetailsContext, PageContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingSnippet } from '../loadingSnippet/loadingSnippet';
import { IDetailSectionContext } from '../../interfaces/detailsSectionInterfaces';

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = 10;
  const pageContext = useContext<IPageContextInterface>(PageContext);
  const { setDetailId } = useContext<IDetailSectionContext>(DetailsContext);
  const navigate = useNavigate();

  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    pageContext?.setState(await fetchData(0, page));
    navigate(`/page/${page}`);
    setIsLoading(false);
    setDetailId('');
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  const { pageNumber } = useParams();
  useLayoutEffect(() => {
    setCurrentPage(Number(pageNumber));
  }, [pageNumber]);

  return (
    <>
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          className={`pageNumber ${currentPage === 1 && 'noActive'}`}
        >
          -
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pageNumber ${currentPage === index + 1 && 'active'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={`pageNumber ${currentPage === totalPages && 'noActive'}`}
        >
          +
        </button>
      </div>
      {isLoading && <LoadingSnippet />}
    </>
  );
}

export { Pagination };
