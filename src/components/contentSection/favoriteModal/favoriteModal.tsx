import { useDispatch, useSelector } from 'react-redux';
import './favoriteModal.scss';
import { removeFavorite } from '../../../app/slices/favoriteSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResetButton } from '../../resetButton/resetButton';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../App';
import { ITheme } from '../../../interfaces/themeProps';
import close from '../../../assets/close-button-dog.svg';
import resetSvg from '../../../assets/paw-empty.svg';
import { DownloadButton } from './downloadButton';
import { RootState } from '../../../app/store';

function FavoriteModal() {
  const { theme } = useContext<ITheme>(ThemeContext);
  const favoriteDogsArray = useSelector((state: RootState) => state.favorite);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathParts = pathname.split('/');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleResetClick = () => {
    favoriteDogsArray.initFavoriteArr.forEach((el) => {
      dispatch(removeFavorite(el));
      navigate(`/${pathParts[1]}`);
    });
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (favoriteDogsArray.initFavoriteArr.length > 0) setIsModalOpen(true);
  }, [favoriteDogsArray.initFavoriteArr.length]);

  return (
    <div
      className={`${favoriteDogsArray.initFavoriteArr.length > 0 && isModalOpen ? 'show-modal' : 'unShow-modal'} favorite-modal ${theme}`}
      data-testid="favorite-modal"
    >
      <p className="favorite-modal_title">
        Congratulations! You feed these dogs! Would you like to reset and do it again or download?
      </p>
      <div className="favorite-modal_content">
        {favoriteDogsArray.initFavoriteArr.length > 0 &&
          favoriteDogsArray.initFavoriteArr.map((item, index) => (
            <div key={index} className="favorite-card">
              <span className="favorite-card_name">{item.breeds[0].name}</span>
              <img
                className="favorite-card_picture"
                src={item.url}
                alt={`Dog ${item.id}`}
                width={item.width}
                height={item.height}
              />
            </div>
          ))}
      </div>
      <div className="favorite-modal_buttons">
        <ResetButton
          className="favorite-modal_button-reset"
          type="button"
          onReset={handleResetClick}
        >
          Reset store
          <img className="favorite-modal_button-reset_svg" src={resetSvg} alt="dog svg" />
        </ResetButton>
        <span>Fed to the dogs: {favoriteDogsArray.initFavoriteArr.length} </span>
        <DownloadButton />
      </div>
      <button className="favorite-modal_button-close" type="button" onClick={handleClose}>
        <img className="favorite-modal_button-close__svg" src={close} alt="dog svg" />
      </button>
    </div>
  );
}

export { FavoriteModal };
