import './contentSection.scss';
import { IDogItem } from '../../interfaces/dogInterface';
import { ErrorBoundaryButton } from '../errorBoundary/errorBoundaryButton';
import { Outlet, useLocation } from 'react-router-dom';
import { Pagination } from '../pagination/pagination';
import { ContentItem } from './contentItem/contentItem';
import { useContext, useEffect } from 'react';
import { fetchDataDetails } from '../../api/requestAllBreeds';
import { IDetailSectionContext } from '../../interfaces/detailsSectionInterfaces';
import { DetailsContext } from '../../App';

function ContentSection({ data }: { data: IDogItem[] }) {
  const { setDetailId, detailId } = useContext<IDetailSectionContext>(DetailsContext);

  const showDetail = (id: string) => {
    setDetailId(id);
  };

  const { pathname } = useLocation();
  useEffect(() => {
    const pathParts = pathname.split('/');
    if (pathParts[3]) {
      fetchDataDetails(pathParts[4]).then(() => {
        setDetailId('detail');
      });
    }
  }, [setDetailId, pathname]);

  return (
    <>
      <main>
        <div className="container-content">
          <section className={`content ${detailId ? 'leftSide' : ''}`}>
            <ErrorBoundaryButton />

            {data &&
              data.map((item: IDogItem) => (
                <ContentItem key={item.id} item={item} showDetail={showDetail} />
              ))}
          </section>
          {detailId && <Outlet />}
        </div>
        <Pagination />
      </main>
    </>
  );
}

export { ContentSection };
