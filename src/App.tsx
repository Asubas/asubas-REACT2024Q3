import { PureComponent } from 'react';
import './App.scss';
import { Header } from './components/header/header';
import { IDogItem } from './interfaces/dogInterface';
import { ContentSection } from './components/contentSection/contentSection';
import { fetchData } from './api/requestApi';
import { LoadingSnippet } from './components/loadingSnippet/loadingSnippet';
import { Footer } from './components/footer/footer';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';

class App extends PureComponent {
  state: { data: IDogItem[] | null } = {
    data: null,
  };

  componentDidMount() {
    this.fetchAndUpdateData();
  }

  fetchAndUpdateData = async () => {
    const data = localStorage.getItem('resultSearch')
      ? await fetchData(Number(localStorage.getItem('resultSearch')))
      : await fetchData();
    this.setState({ data });
  };

  handleDataChange = (data: IDogItem[] | null) => {
    this.setState({ data });
  };

  render() {
    const { data } = this.state;

    return (
      <>
        <ErrorBoundary>
          <Header onDataChange={this.handleDataChange} />
          <main>{data ? <ContentSection data={data} /> : <LoadingSnippet />}</main>
          <Footer />
        </ErrorBoundary>
      </>
    );
  }
}

export { App };
