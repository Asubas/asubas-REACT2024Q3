import './favoriteModal.scss';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../../../app/slices/favoriteSlice';
import { ResetButton } from '../../resetButton/resetButton';
import { useContext, useEffect, useState } from 'react';
import { ITheme } from '../../../interfaces/themeProps';
import close from '../../../../src/assets/close-button-dog.svg';
import resetSvg from '../../../../src/assets/paw-empty.svg';
import { DownloadButton } from './downloadButton';
import { RootState } from '../../../app/store';
import { ThemeContext } from '../../../pages/[slug]';
import { useRouter } from 'next/router';

function FavoriteModal() {
  const { theme } = useContext<ITheme>(ThemeContext);
  const favoriteDogsArray = useSelector((state: RootState) => state.favorite);
  const dispatch = useDispatch();
  const router = useRouter();
  // const pathParts = pathname.split('/');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleResetClick = () => {
    favoriteDogsArray.initFavoriteArr.forEach((el) => {
      dispatch(removeFavorite(el));
    });
    router.push(`/${router.query.slug || '0'}`);
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
          <Image
            className="favorite-modal_button-reset_svg"
            src={resetSvg.src}
            alt="dog svg"
            width={20}
            height={20}
          />
        </ResetButton>
        <span>Fed to the dogs: {favoriteDogsArray.initFavoriteArr.length} </span>
        <DownloadButton />
      </div>
      <button className="favorite-modal_button-close" type="button" onClick={handleClose}>
        <Image
          className="favorite-modal_button-close__svg"
          src={close.src}
          alt="dog svg"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}

export { FavoriteModal };
