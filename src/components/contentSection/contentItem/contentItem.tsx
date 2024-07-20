import './contentItem.scss';
import { memo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IContentItemProps } from '../../../interfaces/contentItemProps';
import { LoadingSnippet } from '../../loadingSnippet/loadingSnippet';

const ContentItem = memo(
  function ContentItem({ item, showDetail }: IContentItemProps) {
    const navigate = useNavigate();
    const [isChecked, setChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { pathname } = useLocation();
    const pathParts = pathname.split('/');
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
        setIsLoading(true);
        showDetail(item.id);
        navigate(`/${pathParts[1]}/${item.id}`);
        setIsLoading(false);
      }
    };
    const handleCheckboxChange = () => {
      isChecked ? setChecked(false) : setChecked(true);
    };

    return (
      <>
        <div className="content_item" onClick={(e) => handleClick(e)}>
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
            />
            <input
              type="checkbox"
              className="content_item__favorites-checkbox"
              id={`${item.id}`}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
        {isLoading && <LoadingSnippet />}
      </>
    );
  },
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id,
);

export { ContentItem };
