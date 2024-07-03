import './searchForm.scss';
import { Component, ReactNode } from 'react';
import { fetchData } from '../../api/requestApi';

import { ISearchFormProps } from '../../interfaces/searchFormProps';

class SearchForm extends Component<ISearchFormProps> {
  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await fetchData();
    this.props.onDataChange(data);
  };

  render(): ReactNode {
    return (
      <>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            className="search-form_input"
            type="text"
            placeholder="Please enter text search"
            autoFocus
          ></input>
          <button className="search-form_button" type="submit">
            Search
          </button>
        </form>
      </>
    );
  }
}

export { SearchForm };
