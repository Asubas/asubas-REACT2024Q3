import './App.scss';
import { Header } from './components/header/header';
import { ContentSection } from './components/contentSection/contentSection';
import { LoadingSnippet } from './components/loadingSnippet/loadingSnippet';
import { Footer } from './components/footer/footer';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Page404 } from './components/page404/page404';
import { DetailsPerDog } from './components/contentSection/details/detailsPerDog';
import { useSelector } from 'react-redux';
import { ITheme } from './interfaces/themeProps';
import { createContext, useState } from 'react';
import { RootState } from './app/store';

const ThemeContext = createContext<ITheme>({
  theme: '',
  setTheme: () => {},
});
function App() {
  const data = useSelector((state: RootState) => state.data);
  const [theme, setTheme] = useState('');

  return (
    <>
      <ErrorBoundary>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/page0" replace />} />
            <Route path=":id" element={data ? <ContentSection /> : <LoadingSnippet />}>
              <Route path=":id" element={<DetailsPerDog />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
          <Footer />
        </ThemeContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export { App, ThemeContext };
