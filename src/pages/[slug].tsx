import './App.scss';
import { createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { ContentSection } from '../components/contentSection/contentSection';
import { ErrorBoundary } from '../components/errorBoundary/errorBoundary';
import { LoadingSnippet } from '../components/loadingSnippet/loadingSnippet';
import { ITheme } from '../interfaces/themeProps';
import { RootState } from '../app/store';

const ThemeContext = createContext<ITheme>({
  theme: '',
  setTheme: () => {},
});

export async function getStaticPaths() {
  const paths = [];
  for (let i = 0; i < 10; i++) {
    paths.push({ params: { slug: `page${i}` } });
  }
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const { slug } = context.params;
  return {
    props: {
      slug,
    },
  };
}

export default function App({ slug }: { slug: string }) {
  const data = useSelector((state: RootState) => state.data);
  const [theme, setTheme] = useState('');

  return (
    <>
      <ErrorBoundary>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          {data ? <ContentSection /> : <LoadingSnippet />}
          {/* <Route path=":id" element={<DetailsPerDog />} /> */}
        </ThemeContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export { ThemeContext };
