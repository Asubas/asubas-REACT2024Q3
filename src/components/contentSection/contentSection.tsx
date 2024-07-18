import './contentSection.scss';
import { IDogItem } from '../../interfaces/dogInterface';
import { Outlet, useLocation } from 'react-router-dom';
import { Pagination } from '../pagination/pagination';
import { ContentItem } from './contentItem/contentItem';
import { useContext, useEffect } from 'react';
import { IDetailSectionContext } from '../../interfaces/detailsSectionInterfaces';
import { useDispatch } from 'react-redux';
import { DetailsContext } from '../../App';
import { setData } from '../../app/dataSlice';
import { useFetchDetailsQuery, useFetchImagesQuery } from '../../app/slices/apiSlice';
import { LoadingSnippet } from '../loadingSnippet/loadingSnippet';
import { Page404 } from '../page404/page404';

function ContentSection() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');
  const pathPartsToPage = pathname.split('page');
  const { setDetailId, detailId } = useContext<IDetailSectionContext>(DetailsContext);
  console.log(typeof detailId);
  const { data: details } = useFetchDetailsQuery({ sub_id: detailId?.toString() });
  console.log(details);
  const { data, error, isLoading } = useFetchImagesQuery({
    searchRequest: 0,
    page: Number(pathPartsToPage[1]),
  });

  const showDetail = (id: string) => {
    setDetailId(id);
    console.log(typeof id);
  };
  useEffect(() => {
    if (pathParts[2]) {
      dispatch(setData(details));
      // setDetailId('detail');
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

  if (isLoading) return <LoadingSnippet />;
  if (error) return <Page404 />;
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
          {detailId && <Outlet context={{ details: detailId }} />}
        </div>
      </main>
    </>
  );
}

export { ContentSection };
