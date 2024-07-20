import './contentSection.scss';
import { IDogItem } from '../../interfaces/dogInterface';
import { Outlet, useLocation } from 'react-router-dom';
import { Pagination } from '../pagination/pagination';
import { ContentItem } from './contentItem/contentItem';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../app/slices/dataSlice';
import { LoadingSnippet } from '../loadingSnippet/loadingSnippet';
import { Page404 } from '../page404/page404';
import { setDetails } from '../../app/slices/detailsSlice';
import { RootState } from '../../app/store';
import { ThemeContext } from '../../App';
import { ITheme } from '../../interfaces/themeProps';
import { useFetchDetailsQuery, useFetchImagesQuery } from '../../api/api';

function ContentSection() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');
  const pathPartsToPage = pathname.split('page');
  const { theme } = useContext<ITheme>(ThemeContext);
  const detailId = useSelector((state: RootState) => state.rootReducer.details);
  const { data, error, isLoading } = useFetchImagesQuery({
    searchRequest: 0,
    page: Number(pathPartsToPage[1]),
  });
  const newData = useSelector((state: RootState) => state.rootReducer.data);
  const {
    data: details,
    error: detailsError,
    isLoading: detailsLoading,
  } = useFetchDetailsQuery({ sub_id: detailId.initialData });
  const showDetail = (id: string) => {
    dispatch(setDetails(id));
  };
  useEffect(() => {
    if (pathParts[2]) {
      dispatch(setData(data));
      dispatch(setDetails(pathParts[2]));
    } else {
      dispatch(setData(data));
    }
  }, [data, dispatch, pathParts]);

  const handleClickSection = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && !e.target.classList.contains('content_item')) {
      dispatch(setDetails(''));
    }
    e.stopPropagation();
    e.preventDefault();
  };

  if (isLoading || detailsLoading) return <LoadingSnippet />;
  if (error || detailsError) return <Page404 />;

  return (
    <>
      <main className={`${theme}`}>
        <div className="container-content">
          <section
            className={`content ${pathParts[2] ? 'leftSide' : ''} ${data && data.length > 1 ? '' : 'once'}`}
            onClick={(e) => handleClickSection(e)}
          >
            {newData &&
              Array.isArray(newData.initialData) &&
              !isLoading &&
              newData.initialData.map((item: IDogItem) => (
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
