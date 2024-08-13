import './header.scss';
import logo from '../../assets/logo-pirates-svg.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to={`/`} className="logo">
        <img className="logoHeader" src={logo} width={90} height={90} alt="logo pirates" />
      </Link>
      <nav className="selectForm">
        <ul className="selectForm-formList">
          <li>
            <Link to={`forms/1`}>Enter your details from regular form</Link>
          </li>
          <li>
            <Link to={`forms/2`}>Enter your details from react-hook form</Link>
          </li>
        </ul>
      </nav>
      <Link to={`/`} className="logo">
        <img className="logoHeader left" src={logo} width={90} height={90} alt="logo pirates" />
      </Link>
    </header>
  );
}

export { Header };
