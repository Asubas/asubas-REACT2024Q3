import { Component, ReactNode } from 'react';
import './loadingSnippet.scss';

class LoadingSnippet extends Component {
  render(): ReactNode {
    return (
      <div className="loading">
        <p>Please wait, dogs coming to you 🐕🐕🐕</p>
      </div>
    );
  }
}

export { LoadingSnippet };
