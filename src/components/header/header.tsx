import './header.scss';
import headerLogo from '../../assets/header-logo.svg';
import { SearchForm } from '../searchForm/searchForm';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsPagination } from '../../app/slices/paginationSlice';
import { setIsReset } from '../../app/slices/resetSlice';
import { setDetails } from '../../app/slices/detailsSlice';
import { ITheme } from '../../interfaces/themeProps';
import { ThemeContext } from '../../App';
import { useContext } from 'react';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext<ITheme>(ThemeContext);

  const handleClick = async () => {
    localStorage.clear();
    navigate('/page0');
    dispatch(setDetails(''));
    dispatch(setIsPagination(true));
    dispatch(setIsReset(true));
  };

  const handleThemeChange = () => {
    theme ? setTheme('') : setTheme('dark');
  };
  return (
    <>
      <header className={`header ${theme}`}>
        <div className="header_logo">
          <Link to="/page0" onClick={handleClick}>
            <img className="header_logo-img" src={headerLogo} alt="dog picture"></img>
          </Link>
        </div>
        <button type="button" className="changeTheme" onClick={handleThemeChange}>
          theme
        </button>
        <p className="header_title">Cute dogs</p>{' '}
        <div className="header_search-container">
          <SearchForm />
        </div>
      </header>
    </>
  );
}

export { Header };
