import './footer.scss';
import Image from 'next/image';
import rsLogo from '../../../src/assets/rs_school_js.svg';
import apiLogo from '../../../src/assets/thedogapi-logo.svg';
import { useContext } from 'react';
import { ITheme } from '../../interfaces/themeProps';
import { ThemeContext } from '../../pages/[slug]';

function Footer() {
  const { theme } = useContext<ITheme>(ThemeContext);
  return (
    <footer className={`footer ${theme}`}>
      <a className="footer_rs-logo" href="https://rs.school/" target="_blank" rel="noreferrer">
        <Image src={rsLogo.src} alt="RS Logo" />
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
        <Image src={apiLogo.src} alt="dog api logo" />
      </a>
    </footer>
  );
}

export { Footer };
