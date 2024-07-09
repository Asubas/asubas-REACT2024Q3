import './header.scss';
import headerLogo from '../../assets/header-logo.svg';
import { SearchForm } from '../searchForm/searchForm';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { IDetailSectionContext } from '../../interfaces/detailsSectionInterfaces';
import { DetailsContext } from '../../App';

function Header() {
  const { setDetailId } = useContext<IDetailSectionContext>(DetailsContext);
  return (
    <>
      <header className="header">
        <div className="header_logo">
          <Link
            to="page/1"
            onClick={() => {
              localStorage.clear();
              setDetailId('');
            }}
          >
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
