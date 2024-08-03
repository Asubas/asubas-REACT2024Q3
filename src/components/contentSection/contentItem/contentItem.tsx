import './contentItem.scss';
import { memo, useEffect, useState } from 'react';
import { IContentItemProps } from '../../../interfaces/contentItemProps';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../../app/slices/favoriteSlice';
import { RootState } from '../../../app/store';
import { useRouter } from 'next/router';

const ContentItem = memo(
  function ContentItem({ item, showDetail }: IContentItemProps) {
    const dispatch = useDispatch();
    const [isChecked, setChecked] = useState(false);
    const favoriteDogsArray = useSelector((state: RootState) => state.favorite);
    const router = useRouter();
    const handleClick = async (e: React.MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        (e.target.classList.contains('content_item__favorites-checkbox') ||
          e.target.classList.contains('content_item__favorites-label'))
      ) {
        e.stopPropagation();
      } else {
        e.preventDefault();
        e.stopPropagation();
        showDetail(item.id);
        // await router.push(`/${router.query.slug}/${item.id}`);
      }
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      e.target.checked ? dispatch(addFavorite(item)) : dispatch(removeFavorite(item));
    };
    useEffect(() => {
      favoriteDogsArray.initFavoriteArr.forEach((el) => {
        if (el.id === item.id) {
          setChecked(true);
        }
      });
    }, [favoriteDogsArray.initFavoriteArr, item.id]);
    return (
      <>
        <div className="content_item" onClick={(e) => handleClick(e)} data-testid="favorite-card">
          <img
            className="content_item__picture"
            src={item.url}
            alt={`Dog ${item.id}`}
            width={item.width}
            height={item.height}
          />
          <div className="content_item__components">
            <p className="content_item__title">{item.breeds[0].name}</p>
            <label
              htmlFor={`${item.id}`}
              className={`content_item__favorites-label ${isChecked ? 'is-checked' : ''}`}
              data-testid="label"
            />
            <input
              type="checkbox"
              className="content_item__favorites-checkbox"
              id={`${item.id}`}
              checked={isChecked}
              onChange={handleCheckboxChange}
              data-testid="checkbox-input"
            />
          </div>
        </div>
      </>
    );
  },
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id,
);

export { ContentItem };
