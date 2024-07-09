import './contentSection.scss';
import { IDogItem } from '../../interfaces/dogInterface';
import { ErrorBoundaryButton } from '../errorBoundary/errorBoundaryButton';
import { Outlet, useLocation } from 'react-router-dom';
import { Pagination } from '../pagination/pagination';
import { ContentItem } from './contentItem/contentItem';
import { useLayoutEffect, useState } from 'react';
import { fetchDataDetails } from '../../api/requestAllBreeds';

function ContentSection({ data }: { data: IDogItem[] }) {
  const [currentDetailId, setCurrentDetailId] = useState('');
  const showDetail = (id: string) => {
    setCurrentDetailId(id);
  };
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    const pathParts = pathname.split('/');
    if (pathParts[3]) {
      fetchDataDetails(pathParts[4]).then((res) => {
        setCurrentDetailId(res);
      });
    }
  }, [pathname]);

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
