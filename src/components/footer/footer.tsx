import './footer.scss';
import rsLogo from '../../assets/rs_school_js.svg';

function Footer() {
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
    </footer>
  );
}

export { Footer };
