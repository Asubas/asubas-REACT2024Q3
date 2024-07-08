import headerLogo from '../../assets/header-logo.svg';
import './header.scss';
import { SearchForm } from '../searchForm/searchForm';
import { IDogItem } from '../../interfaces/dogInterface';

function Header({ onDataChange }: { onDataChange: (data: IDogItem[]) => void }) {
  const handleDataChange = (data: IDogItem[] | null) => {
    if (data) onDataChange(data);
  };
  return (
    <>
      <header className="header">
        <div className="header_logo">
          <a href=" ">
            <img className="header_logo-img" src={headerLogo} alt="dog picture"></img>
          </a>
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
