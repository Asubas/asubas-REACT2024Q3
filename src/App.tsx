import './App.scss';
import { useEffect, useState } from 'react';
import { Header } from './components/header/header';
import { IDogItem } from './interfaces/dogInterface';
import { ContentSection } from './components/contentSection/contentSection';
import { LoadingSnippet } from './components/loadingSnippet/loadingSnippet';
import { Footer } from './components/footer/footer';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { useReturnData } from './userHooks/useReturnData';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Page404 } from './components/page404/page404';
import { Details } from './components/details/details';

function App() {
  const data = useReturnData();
  const [state, setState] = useState<IDogItem[] | null>(data);

  useEffect(() => {
    setState(data);
  }, [data]);

  const handleDataChange = (newData: IDogItem[] | null) => {
    setState(newData);
  };

  return (
    <>
      <ErrorBoundary>
        <Header onDataChange={handleDataChange} />
        <Routes>
          <Route path="/" element={<Navigate to="/page1" replace />} />
          <Route
            path="/page1"
            element={state ? <ContentSection data={state} /> : <LoadingSnippet />}
          >
            <Route path="details/:id" element={<Details />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </ErrorBoundary>
    </>
  );
}

export { App };
