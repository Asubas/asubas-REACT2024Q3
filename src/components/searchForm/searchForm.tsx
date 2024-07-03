import './searchForm.scss';
import { Component, ReactNode } from 'react';
import { fetchData } from '../../api/requestApi';
import { ISearchFormProps } from '../../interfaces/searchFormProps';
import { ILoadState } from '../../interfaces/loadSate';
import { LoadingSnippet } from '../loadingSnippet/loadingSnippet';
import { fetchDataBreeds } from '../../api/requestAllBreeds';
import { IBreedProps } from '../../interfaces/breedProps';
import { ModalBoundary } from '../../modalBoundary/modalBoundary';

class SearchForm extends Component<ISearchFormProps> {
  state: ILoadState = {
    isLoading: false,
    searchQuery: '',
    noHaveDog: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  resetSearch = async () => {
    this.setState({ searchQuery: '', isLoading: true });
    const data = await fetchData();
    this.props.onDataChange(data);
    localStorage.removeItem('resultSearch');
    this.setState({ isLoading: false });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { searchQuery } = this.state;
    const responseBreeds = await fetchDataBreeds();
    const firstMatch = responseBreeds.find((dog: IBreedProps) =>
      dog.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    let data;
    if (firstMatch) {
      localStorage.setItem('resultSearch', firstMatch.id);
      data = await fetchData(firstMatch.id);
    } else {
      this.setState({ isLoading: false });
      this.setState({ noHaveDog: true });
      setTimeout(() => {
        this.setState({ noHaveDog: false });
      }, 3000);
      data = await fetchData();
    }
    this.props.onDataChange(data);
    this.setState({ isLoading: false });
  };

  render(): ReactNode {
    return (
      <>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            className="search-form_input"
            type="text"
            value={this.state.searchQuery.trim()}
            onChange={this.handleInputChange}
            placeholder="Please enter search breed"
            autoFocus
            required
          ></input>
          <button className="search-form_button" type="submit">
            Search
          </button>
          <button className="search-form_button" type="button" onClick={this.resetSearch}>
            Reset
          </button>
        </form>
        {this.state.isLoading && <LoadingSnippet />}
        {this.state.noHaveDog && <ModalBoundary />}
      </>
    );
  }
}

export { SearchForm };
