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
import { ThemeContext } from '../../App';
import { ITheme } from '../../interfaces/themeProps';
import { useFetchDetailsQuery, useFetchImagesQuery } from '../../api/api';
import { FavoriteModal } from './favoriteModal/favoriteModal';
import { RootState } from '../../app/store';

function ContentSection() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');
  let pathPartsToPage = pathname.split('page')[1];
  if (pathParts[2]) pathPartsToPage = pathname.split('page')[1].split('/')[0];
  const { theme } = useContext<ITheme>(ThemeContext);
  const detailId = useSelector((state: RootState) => state.details);
  const resultSearch = useSelector((state: RootState) => state.searchResult);
  const { data, isFetching, error } = useFetchImagesQuery({
    searchRequest: 0,
    page: Number(pathPartsToPage),
  });
  const newData = useSelector((state: RootState) => state.data);
  const {
    data: details,
    error: detailsError,
    isFetching: detailsFetching,
  } = useFetchDetailsQuery({ sub_id: detailId.initialData }, { skip: !detailId.initialData });

  const showDetail = (id: string) => {
    dispatch(setDetails(id));
  };

  useEffect(() => {
    if (resultSearch.isResult) return;
    if (pathParts[2]) {
      dispatch(setData(data));
      dispatch(setDetails(pathParts[2]));
    } else {
      dispatch(setData(data));
    }
  }, [data, detailId.initialData, dispatch, pathParts, resultSearch]);

  const handleClickSection = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && !e.target.classList.contains('content_item')) {
      dispatch(setDetails(''));
    }
    e.stopPropagation();
    e.preventDefault();
  };

  if (isFetching || detailsFetching) return <LoadingSnippet />;
  if (error || detailsError) return <Page404 />;

  return (
    <>
      <main className={`${theme}`}>
        <div className="container-content">
          <section
            className={`content ${detailId.initialData ? 'leftSide' : ''} ${data && data.length > 1 ? '' : 'once'}`}
            onClick={handleClickSection}
          >
            {newData &&
              Array.isArray(newData.initialData) &&
              !isFetching &&
              newData.initialData.map((item: IDogItem) => (
                <ContentItem key={item.id} item={item} showDetail={showDetail} />
              ))}
            <Pagination />
          </section>
          {detailId.initialData && <Outlet context={{ details: details }} />}
          <FavoriteModal />
        </div>
      </main>
    </>
  );
}

export { ContentSection };
