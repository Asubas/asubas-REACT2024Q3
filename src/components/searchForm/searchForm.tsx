import { Component, ReactNode } from 'react';
import './searchForm.scss';

class SearchForm extends Component {
  render(): ReactNode {
    return (
      <>
        <form className="search-form">
          <input
            className="search-form_input"
            type="text"
            placeholder="Please enter text search"
          ></input>
        </form>
      </>
    );
  }
}

export { SearchForm };
