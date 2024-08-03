import './contentSection.scss';
import { IDogItem } from '../../interfaces/dogInterface';
import { Pagination } from '../pagination/pagination';
import { ContentItem } from './contentItem/contentItem';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../app/slices/dataSlice';
import { LoadingSnippet } from '../loadingSnippet/loadingSnippet';
import { Page404 } from '../../pages/404';
import { setDetails } from '../../app/slices/detailsSlice';
import { ITheme } from '../../interfaces/themeProps';
import { useFetchImagesQuery } from '../../api/api';
import { FavoriteModal } from './favoriteModal/favoriteModal';
import { RootState } from '../../app/store';
import router, { useRouter } from 'next/router';
import { ThemeContext } from '../../pages/[slug]';

function ContentSection() {
  const dispatch = useDispatch();
  const { asPath } = useRouter();
  const pathParts = asPath.split('/');

  let pathPartsToPage = asPath.split('page')[1];
  if (pathParts[2]) pathPartsToPage = asPath.split('page')[1].split('/')[0];
  const { theme } = useContext<ITheme>(ThemeContext);
  const detailId = useSelector((state: RootState) => state.details);
  const resultSearch = useSelector((state: RootState) => state.searchResult);
  const { data, isFetching, error } = useFetchImagesQuery({
    searchRequest: 0,
    page: Number(pathPartsToPage),
  });
  const newData = useSelector((state: RootState) => state.data);
  // const {
  //   data: details,
  //   error: detailsError,
  //   isFetching: detailsFetching,
  // } = useFetchDetailsQuery({ sub_id: detailId.initialData }, { skip: !detailId.initialData });

  const showDetail = (id: string) => {
    dispatch(setDetails(id));
    const currentPage = Number(pathPartsToPage) || 0;
    // router.push(`/page${currentPage}/${id}`, undefined, { shallow: true });
    router.replace(`/page${currentPage}/${id}`, undefined, { shallow: true });
  };

  useEffect(() => {
    if (resultSearch.isResult) return;
    if (pathParts[2]) {
      dispatch(setData(data));
      dispatch(setDetails(pathParts[2]));
      console.log(pathParts[2]);
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

  if (isFetching) return <LoadingSnippet />;
  if (error) return <Page404 />;

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
          {/* {detailId.initialData && <Outlet context={{ details: details }} />} */}
          <FavoriteModal />
        </div>
      </main>
    </>
  );
}

export { ContentSection };
