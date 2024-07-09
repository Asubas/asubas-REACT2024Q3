import './App.scss';
import { createContext, useEffect, useState } from 'react';
import { Header } from './components/header/header';
import { IDogItem } from './interfaces/dogInterface';
import { ContentSection } from './components/contentSection/contentSection';
import { LoadingSnippet } from './components/loadingSnippet/loadingSnippet';
import { Footer } from './components/footer/footer';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { useReturnData } from './userHooks/useReturnData';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Page404 } from './components/page404/page404';
import { DetailsPerDog } from './components/contentSection/details/detailsPerDog';
import { IPageContextInterface } from './interfaces/pageContextInterface';
import { IDetailSectionContext } from './interfaces/detailsSectionInterfaces';

const PageContext = createContext<IPageContextInterface>({
  setState: () => {},
});
const DetailsContext = createContext<IDetailSectionContext>({
  detailId: '',
  setDetailId: () => {},
});
function App() {
  const data = useReturnData();
  const [state, setState] = useState<IDogItem[] | null>(data);
  const [detailId, setDetailId] = useState('');

  useEffect(() => {
    setState(data);
  }, [data]);

  return (
    <>
      <ErrorBoundary>
        <PageContext.Provider value={{ setState }}>
          <DetailsContext.Provider value={{ detailId, setDetailId }}>
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/page/1" replace />} />
              <Route
                path="/page/:pageNumber"
                element={state ? <ContentSection data={state} /> : <LoadingSnippet />}
              >
                <Route path="details/:id" element={<DetailsPerDog />} />
              </Route>
              <Route path="*" element={<Page404 />} />
            </Routes>
            <Footer />
          </DetailsContext.Provider>
        </PageContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export { App, PageContext, DetailsContext };
