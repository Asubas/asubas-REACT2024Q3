import { Component } from 'react';
import './App.css';
import { Header } from './components/header/header';
import { IDogItem } from './interfaces/dogInterface';
import { ContentSection } from './components/contentSection/contentSection';

class App extends Component {
  state: { data: IDogItem[] | null } = {
    data: null,
  };

  handleDataChange = (data: IDogItem[] | null) => {
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <Header onDataChange={this.handleDataChange} />
        {data ? <ContentSection data={data} /> : <div>Loading...</div>}
      </>
    );
  }
}

export { App };
