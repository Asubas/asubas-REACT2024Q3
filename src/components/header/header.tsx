import './header.scss';
import headerLogo from '../../assets/header-logo.svg';
import { SearchForm } from '../searchForm/searchForm';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { IDetailSectionContext } from '../../interfaces/detailsSectionInterfaces';
import { DetailsContext, PageContext } from '../../App';
import { IPageContextInterface } from '../../interfaces/pageContextInterface';
import { fetchData } from '../../api/requestApi';

function Header() {
  const { setDetailId } = useContext<IDetailSectionContext>(DetailsContext);
  const { setState, setIsPagination, setIsReset } = useContext<IPageContextInterface>(PageContext);

  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate('/page0');
    setDetailId('');
    setIsPagination(true);
    setIsReset(true);
    const data = await fetchData();
    setState(data);
  };
  return (
    <>
      <header className="header">
        <div className="header_logo">
          <Link to="/page0" onClick={handleClick}>
            <img className="header_logo-img" src={headerLogo} alt="dog picture"></img>
          </Link>
        </div>
        <p className="header_title">Cute dogs</p>{' '}
        <div className="header_search-container">
          <SearchForm />
        </div>
      </header>
    </>
  );
}

export { Header };
