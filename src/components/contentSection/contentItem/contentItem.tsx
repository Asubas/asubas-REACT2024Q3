import { memo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IContentItemProps } from '../../../interfaces/contentItemProps';
import { LoadingSnippet } from '../../loadingSnippet/loadingSnippet';

const ContentItem = memo(
  function ContentItem({ item, showDetail }: IContentItemProps) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { pageNumber } = useParams();
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsLoading(true);
      showDetail(item.id);
      navigate(`/page/${pageNumber}/details/${item.id}`);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
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
          <p className="content_item__title">{item.breeds[0].name}</p>
        </div>
        {isLoading && <LoadingSnippet />}
      </>
    );
  },
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id,
);

export { ContentItem };
