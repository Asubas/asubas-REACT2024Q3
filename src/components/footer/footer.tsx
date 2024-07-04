import './footer.scss';
import { PureComponent, ReactNode } from 'react';
import rsLogo from '../../assets/rs_school_js.svg';
import apiLogo from '../../assets/thedogapi-logo.svg';

class Footer extends PureComponent {
  render(): ReactNode {
    return (
      <footer className="footer">
        <a className="footer_rs-logo" href="https://rs.school/" target="_blank" rel="noreferrer">
          <img src={rsLogo} alt="RS Logo" />
        </a>
        <a
          className="footer_author-link"
          href="https://github.com/Asubas"
          target="_blank"
          rel="noreferrer"
        >
          {' '}
          Made by Asubas
        </a>

        <a className="footer_api" href="https://thedogapi.com/" target="_blank" rel="noreferrer">
          <img src={apiLogo} alt="dog api logo" />
        </a>
      </footer>
    );
  }
}

export { Footer };
