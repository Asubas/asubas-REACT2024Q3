import { useDispatch, useSelector } from 'react-redux';
import './favoriteModal.scss';
import { RootState } from '../../../app/store';
import { removeFavorite, resetStore } from '../../../app/slices/favoriteSlice';

function FavoriteModal() {
  const favoriteDogsArray = useSelector((state: RootState) => state.rootReducer.favorite);
  const dispatch = useDispatch();

  const handleResetClick = () => {
    // dispatch(resetStore());
    favoriteDogsArray.initFavoriteArr.forEach((el) => {
      dispatch(removeFavorite(el));
      console.log(el);
    });
  };

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
      <button className="resetStore" type="button" onClick={handleResetClick}>
        reset store
      </button>
      <button className="downloadStore" type="button">
        download
      </button>
    </div>
  );
}

export { FavoriteModal };
function setChecked(arg0: boolean) {
  throw new Error('Function not implemented.');
}
