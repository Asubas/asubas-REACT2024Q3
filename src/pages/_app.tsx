import { Provider } from 'react-redux';
import { store } from '../app/store';
import { AppProps } from 'next/app';
import { ThemeContext } from './[slug]';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme: '', setTheme: () => {} }}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeContext.Provider>
    </Provider>
  );
}

export default MyApp;
