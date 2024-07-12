import './contentSection.scss';
import { IDogItem } from '../../interfaces/dogInterface';
import { Outlet, useLocation } from 'react-router-dom';
import { Pagination } from '../pagination/pagination';
import { ContentItem } from './contentItem/contentItem';
import { useContext, useEffect, useState } from 'react';
import { fetchDataDetails } from '../../api/requestAllBreeds';
import { IDetailSectionContext } from '../../interfaces/detailsSectionInterfaces';
import { DetailsContext } from '../../App';

function ContentSection({ data }: { data: IDogItem[] }) {
  const { setDetailId, detailId } = useContext<IDetailSectionContext>(DetailsContext);

  const [result, setResult] = useState<IDogItem>({
    breeds: [],
    height: 0,
    width: 0,
    id: '',
    url: '',
  });

  const showDetail = (id: string) => {
    setDetailId(id);
  };

  const { pathname } = useLocation();
  useEffect(() => {
    const pathParts = pathname.split('/');
    if (pathParts[2]) {
      fetchDataDetails(pathParts[2]).then((res) => {
        setResult(res);
        setDetailId('detail');
      });
    }
  }, [setDetailId, pathname]);

  const handleClickSection = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && !e.target.classList.contains('content_item')) {
      setDetailId('');
    }
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <>
      <main>
        <div className="container-content">
          <section
            className={`content ${detailId ? 'leftSide' : ''} ${data.length > 1 ? '' : 'once'}`}
            onClick={(e) => handleClickSection(e)}
          >
            {data &&
              data.map((item: IDogItem) => (
                <ContentItem key={item.id} item={item} showDetail={showDetail} />
              ))}
            <Pagination />
          </section>
          {detailId && <Outlet context={{ details: result }} />}
        </div>
      </main>
    </>
  );
}

export { ContentSection };
