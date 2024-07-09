import './contentSection.scss';
import { IDogItem } from '../../interfaces/dogInterface';
import { ErrorBoundaryButton } from '../errorBoundary/errorBoundaryButton';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function ContentSection({ data }: { data: IDogItem[] }) {
  const [showDetails, setShowDetails] = useState('');
  const navigate = useNavigate();
  const showDetail = (id: string) => {
    setShowDetails(id);
    navigate(`/page1/details/${id}`);
  };
  return (
    <>
      <section className="content">
        <ErrorBoundaryButton />
        {data &&
          data.map((item: IDogItem, index: number) => (
            <div
              className="content_item"
              key={item.id}
              onClick={() => {
                showDetail(item.id);
              }}
            >
              <img
                className="content_item__picture"
                src={item.url}
                alt={`Dog ${index}`}
                width={item.width}
                height={item.height}
              />
              <p className="content_item__title">{item.breeds[0].name}</p>
            </div>
          ))}
        {showDetails && <Outlet />}
      </section>
      <div className="pagination"></div>
    </>
  );
}

export { ContentSection };
