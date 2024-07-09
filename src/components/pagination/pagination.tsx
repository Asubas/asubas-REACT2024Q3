import './pagination.scss';
import { useContext, useState } from 'react';
import { fetchData } from '../../api/requestApi';
import { IPageContextInterface } from '../../interfaces/pageContextInterface';
import { PageContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageContext = useContext<IPageContextInterface | null>(PageContext);
  const navigate = useNavigate();

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    pageContext?.setState(await fetchData(0, page));
    console.log(page);
    navigate(`/page/${page}`);
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
    </>
  );
}

export { Pagination };
