import './contentSection.scss';
import { IDogItem } from '../../interfaces/dogInterface';
import { Outlet, useLocation } from 'react-router-dom';
import { Pagination } from '../pagination/pagination';
import { ContentItem } from './contentItem/contentItem';
import { useContext, useEffect } from 'react';
import { IDetailSectionContext } from '../../interfaces/detailsSectionInterfaces';
import { useDispatch } from 'react-redux';
import { DetailsContext } from '../../App';
import { setData } from '../../app/slices/dataSlice';
import { useFetchDetailsQuery, useFetchImagesQuery } from '../../app/slices/apiSlice';
import { LoadingSnippet } from '../loadingSnippet/loadingSnippet';
import { Page404 } from '../page404/page404';

function ContentSection() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');
  const pathPartsToPage = pathname.split('page');
  const { setDetailId, detailId } = useContext<IDetailSectionContext>(DetailsContext);
  const {
    data: details,
    error: detailsError,
    isLoading: detailsLoading,
  } = useFetchDetailsQuery({ sub_id: detailId });
  const { data, error, isLoading } = useFetchImagesQuery({
    searchRequest: 0,
    page: Number(pathPartsToPage[1]),
  });

  const showDetail = (id: string) => {
    setDetailId(id);
  };
  useEffect(() => {
    if (pathParts[2]) {
      dispatch(setData(details));
    } else if (data && !isLoading) {
      dispatch(setData(data));
    }
  }, [data, details, dispatch, isLoading, pathParts, setDetailId]);

  const handleClickSection = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && !e.target.classList.contains('content_item')) {
      setDetailId('');
    }
    e.stopPropagation();
    e.preventDefault();
  };

  if (isLoading || detailsLoading) return <LoadingSnippet />;
  if (error || detailsError) return <Page404 />;
  return (
    <>
      <main>
        <div className="container-content">
          <section
            className={`content ${detailId ? 'leftSide' : ''} ${data && data.length > 1 ? '' : 'once'}`}
            onClick={(e) => handleClickSection(e)}
          >
            {data &&
              !isLoading &&
              data.map((item: IDogItem) => (
                <ContentItem key={item.id} item={item} showDetail={showDetail} />
              ))}
            <Pagination />
          </section>
          {details && <Outlet context={{ details: details }} />}
        </div>
      </main>
    </>
  );
}

export { ContentSection };
