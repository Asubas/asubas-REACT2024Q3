import './searchForm.scss';
import { PureComponent, ReactNode } from 'react';
import { fetchData } from '../../api/requestApi';
import { ISearchFormProps } from '../../interfaces/searchFormProps';
import { ILoadState } from '../../interfaces/loadSate';
import { LoadingSnippet } from '../loadingSnippet/loadingSnippet';
import { fetchDataBreeds } from '../../api/requestAllBreeds';
import { IBreedProps } from '../../interfaces/breedProps';
import { ModalBoundary } from '../../modalBoundary/modalBoundary';
import search from '../../assets/button-search-dog.svg';
import resetSearch from '../../assets/button-search-dog-v2.svg';
class SearchForm extends PureComponent<ISearchFormProps> {
  state: ILoadState = {
    isLoading: false,
    searchQuery: '',
    noHaveDog: false,
  };

  componentDidMount() {
    if (localStorage.getItem('textSearch')) {
      this.setState({ searchQuery: localStorage.getItem('textSearch') || '' });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  resetSearch = async () => {
    this.setState({ searchQuery: '', isLoading: true });
    const data = await fetchData();
    this.props.onDataChange(data);
    localStorage.removeItem('resultSearch');
    localStorage.removeItem('textSearch');
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
      localStorage.setItem('textSearch', searchQuery.toLowerCase().trim());
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
          />
          <button className="search-form_button" type="submit">
            Search
            <img className="search-form_button__svg" src={search} alt="dog svg" />
          </button>
          <button className="search-form_button" type="button" onClick={this.resetSearch}>
            Reset
            <img className="search-form_button__svg" src={resetSearch} alt="dog svg crossed out" />
          </button>
        </form>
        {this.state.isLoading && <LoadingSnippet />}
        {this.state.noHaveDog && <ModalBoundary />}
      </>
    );
  }
}

export { SearchForm };
