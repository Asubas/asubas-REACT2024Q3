import './header.scss';
import headerLogo from '../../assets/header-logo.svg';
import { SearchForm } from '../searchForm/searchForm';
import { useNavigate } from 'react-router-dom';
import { ITheme } from '../../interfaces/themeProps';
import { ThemeContext } from '../../App';
import { useContext } from 'react';
import { ResetButton } from '../resetButton/resetButton';

function Header() {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext<ITheme>(ThemeContext);

  const handleClick = async () => {
    navigate('/page0');
  };

  const handleThemeChange = () => {
    theme ? setTheme('') : setTheme('dark');
  };
  return (
    <>
      <header className={`header ${theme}`} data-testid="header">
        <div className="header_logo">
          <ResetButton
            className="header_logo__button"
            type="button"
            data-testid="header-logo-button"
            onReset={handleClick}
          >
            <img className="header_logo-img" src={headerLogo} alt="dog picture"></img>
          </ResetButton>
        </div>
        <p className="header_title">Cute dogs</p>{' '}
        <div className="header_search-container">
          <button
            type="button"
            data-testid="theme-button"
            className={`changeTheme ${theme}`}
            onClick={handleThemeChange}
          />
          <SearchForm />
        </div>
      </header>
    </>
  );
}

export { Header };
