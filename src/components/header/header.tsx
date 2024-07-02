import { Component, ReactNode } from 'react';
import headerLogo from '../../assets/header-logo.svg';
import './header.scss';
import { SearchForm } from '../searchForm/searchForm';

class Header extends Component {
  render(): ReactNode {
    return (
      <>
        <header className="header">
          <div className="header_logo">
            <a href="">
              <img className="header_logo-img" src={headerLogo} alt="dog picture"></img>
            </a>
          </div>
          <div className="header_search-container">
            <SearchForm />
          </div>
        </header>
      </>
    );
  }
}

export { Header };
