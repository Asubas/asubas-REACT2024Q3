import './App.scss';
import { createContext, useState } from 'react';
import { Header } from './components/header/header';
import { ContentSection } from './components/contentSection/contentSection';
import { LoadingSnippet } from './components/loadingSnippet/loadingSnippet';
import { Footer } from './components/footer/footer';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Page404 } from './components/page404/page404';
import { DetailsPerDog } from './components/contentSection/details/detailsPerDog';
import { IPageContextInterface } from './interfaces/pageContextInterface';
import { IDetailSectionContext } from './interfaces/detailsSectionInterfaces';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';

const PageContext = createContext<IPageContextInterface>({
  isPagination: true,
  isReset: false,
  setIsReset: () => {},
  setIsPagination: () => {},
});

const DetailsContext = createContext<IDetailSectionContext>({
  detailId: '',
  setDetailId: () => {},
});
function App() {
  const data = useSelector((state: RootState) => state.data);
  const [detailId, setDetailId] = useState('');
  const [isPagination, setIsPagination] = useState(true);
  const [isReset, setIsReset] = useState(false);

  return (
    <>
      <ErrorBoundary>
        <PageContext.Provider value={{ isPagination, setIsPagination, isReset, setIsReset }}>
          <DetailsContext.Provider value={{ detailId, setDetailId }}>
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/page0" replace />} />
              <Route path=":id" element={data ? <ContentSection /> : <LoadingSnippet />}>
                <Route path=":id" element={<DetailsPerDog />} />
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

export { App, DetailsContext, PageContext };
