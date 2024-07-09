import './header.scss';
import headerLogo from '../../assets/header-logo.svg';
import { SearchForm } from '../searchForm/searchForm';
import { IDogItem } from '../../interfaces/dogInterface';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PageContext } from '../../App';
import { IPageContextInterface } from '../../interfaces/pageContextInterface';

function Header() {
  const pageContext = useContext<IPageContextInterface | null>(PageContext);
  const handleDataChange = (data: IDogItem[] | null) => {
    if (pageContext?.setState) pageContext.setState(data);
  };
  return (
    <>
      <header className="header">
        <div className="header_logo">
          <Link to="/">
            <img className="header_logo-img" src={headerLogo} alt="dog picture"></img>
          </Link>
        </div>
        <p className="header_title">Cute dogs</p>{' '}
        <div className="header_search-container">
          <SearchForm onDataChange={handleDataChange} />
        </div>
      </header>
    </>
  );
}

export { Header };
