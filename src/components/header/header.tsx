import './header.scss';
import headerLogo from '../../assets/header-logo.svg';
import { SearchForm } from '../searchForm/searchForm';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { IDetailSectionContext } from '../../interfaces/detailsSectionInterfaces';
import { DetailsContext } from '../../App';
import { setData } from '../../app/slices/dataSlice';
import { useFetchImagesQuery } from '../../app/slices/apiSlice';
import { useDispatch } from 'react-redux';
import { setIsPagination } from '../../app/slices/paginationSlice';
import { setIsReset } from '../../app/slices/resetSlice';

function Header() {
  const { setDetailId } = useContext<IDetailSectionContext>(DetailsContext);
  const dispatch = useDispatch();
  const { data } = useFetchImagesQuery({});

  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate('/page0');
    setDetailId('');
    dispatch(setIsPagination(true));
    dispatch(setIsReset(true));
    dispatch(setData(data));
  };
  return (
    <>
      <header className="header">
        <div className="header_logo">
          <Link to="/page0" onClick={handleClick}>
            <img className="header_logo-img" src={headerLogo} alt="dog picture"></img>
          </Link>
        </div>
        <p className="header_title">Cute dogs</p>{' '}
        <div className="header_search-container">
          <SearchForm />
        </div>
      </header>
    </>
  );
}

export { Header };
