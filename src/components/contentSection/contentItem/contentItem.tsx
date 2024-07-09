import { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IContentItemProps } from '../../../interfaces/contentItemProps';

const ContentItem = memo(
  function ContentItem({ item, showDetail }: IContentItemProps) {
    const navigate = useNavigate();
    const { pageNumber } = useParams();
    const handleClick = () => {
      showDetail(item.id);
      navigate(`/page/${pageNumber}/details/${item.id}`);
    };

    return (
      <div className="content_item" onClick={() => handleClick()}>
        <img
          className="content_item__picture"
          src={item.url}
          alt={`Dog ${item.id}`}
          width={item.width}
          height={item.height}
        />
        <p className="content_item__title">{item.breeds[0].name}</p>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id,
);

export { ContentItem };
