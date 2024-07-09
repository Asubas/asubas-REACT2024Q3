import './contentSection.scss';
import { IDogItem } from '../../interfaces/dogInterface';
import { ErrorBoundaryButton } from '../errorBoundary/errorBoundaryButton';
import { Outlet } from 'react-router-dom';
import { Pagination } from '../pagination/pagination';
import { ContentItem } from './contentItem/contentItem';
import { useState } from 'react';

function ContentSection({ data }: { data: IDogItem[] }) {
  const [currentDetailId, setCurrentDetailId] = useState('');
  const showDetail = (id: string) => {
    setCurrentDetailId(id);
  };

  return (
    <>
      <section className="content">
        <ErrorBoundaryButton />
        {data &&
          data.map((item: IDogItem) => (
            <ContentItem key={item.id} item={item} showDetail={showDetail} />
          ))}
        {currentDetailId && <Outlet />}
      </section>
      <Pagination />
    </>
  );
}

export { ContentSection };
