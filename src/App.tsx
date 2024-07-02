import { Component } from 'react';
import './App.css';
import { Header } from './components/header/header';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <h1>hello world</h1>
      </>
    );
  }
}

export { App };
