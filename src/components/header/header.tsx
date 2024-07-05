import { PureComponent, ReactNode } from 'react';
import headerLogo from '../../assets/header-logo.svg';
import './header.scss';
import { SearchForm } from '../searchForm/searchForm';
import { IHeaderProps } from '../../interfaces/headerProps';
import { IDogItem } from '../../interfaces/dogInterface';

class Header extends PureComponent<IHeaderProps> {
  handleDataChange = (data: IDogItem[] | null) => {
    this.props.onDataChange(data);
  };

  render(): ReactNode {
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
            <SearchForm onDataChange={this.handleDataChange} />
          </div>
        </header>
      </>
    );
  }
}

export { Header };
