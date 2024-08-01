import './header.scss';
import Image from 'next/image';
import headerLogo from '../../../src/assets/header-logo.svg';
import { SearchForm } from '../searchForm/searchForm';
import { ITheme } from '../../interfaces/themeProps';
import { useContext } from 'react';
import { ResetButton } from '../resetButton/resetButton';
import Link from 'next/link';
import { ThemeContext } from '../../pages/[slug]';

function Header() {
  const { theme, setTheme } = useContext<ITheme>(ThemeContext);

  const handleThemeChange = () => {
    theme ? setTheme('') : setTheme('dark');
  };
  return (
    <>
      <header className={`header ${theme}`} data-testid="header">
        <div className="header_logo">
          <Link href="/page0">
            <ResetButton
              className="header_logo__button"
              type="button"
              data-testid="header-logo-button"
            />
          </Link>
          <Image
            className="header_logo-img"
            src={headerLogo.src}
            alt="dog picture"
            width={100}
            height={50}
          />
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
