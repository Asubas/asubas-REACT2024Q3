import './App.scss';
import { useEffect, useState } from 'react';
import { Header } from './components/header/header';
import { IDogItem } from './interfaces/dogInterface';
import { ContentSection } from './components/contentSection/contentSection';
import { LoadingSnippet } from './components/loadingSnippet/loadingSnippet';
import { Footer } from './components/footer/footer';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { useReturnData } from './userHooks/useReturnData';

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
        {state ? <ContentSection data={state} /> : <LoadingSnippet />}
        <Footer />
      </ErrorBoundary>
    </>
  );
}

export { App };
