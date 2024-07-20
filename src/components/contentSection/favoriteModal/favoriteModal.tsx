import { useSelector } from 'react-redux';
import './favoriteModal.scss';
import { RootState } from '../../../app/store';

function FavoriteModal() {
  const favoriteDogsArray = useSelector((state: RootState) => state.rootReducer.favorite);
  return (
    <div
      className={`${favoriteDogsArray.initFavoriteArr.length > 0 ? 'show-modal' : 'unShow-modal'} favorite-modal`}
    >
      {favoriteDogsArray.initFavoriteArr.length > 0 &&
        favoriteDogsArray.initFavoriteArr.map((item, index) => (
          <div key={index} className="favorite-card">
            {item.id}
          </div>
        ))}
    </div>
  );
}

export { FavoriteModal };
