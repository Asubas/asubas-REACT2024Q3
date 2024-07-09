import './searchForm.scss';
import { fetchData } from '../../api/requestApi';
import { LoadingSnippet } from '../loadingSnippet/loadingSnippet';
import { fetchDataBreeds } from '../../api/requestAllBreeds';
import { IBreedProps } from '../../interfaces/breedProps';
import { ModalBoundary } from '../../modalBoundary/modalBoundary';
import search from '../../assets/button-search-dog.svg';
import resetSearchImg from '../../assets/button-search-dog-v2.svg';
import { useContext, useEffect, useState } from 'react';
import { IPageContextInterface } from '../../interfaces/pageContextInterface';
import { PageContext, DetailsContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { IDetailSectionContext } from '../../interfaces/detailsSectionInterfaces';

function SearchForm() {
  const pageContext = useContext<IPageContextInterface>(PageContext);
  const detailContext = useContext<IDetailSectionContext>(DetailsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHaveDog, setIsHaveDog] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const storedSearchText = localStorage.getItem('textSearch');
    if (storedSearchText) {
      setSearchQuery(storedSearchText);
    }
  }, []);

  const resetSearch = async () => {
    setSearchQuery('');
    setIsLoading(true);
    fetchData().then((res) => {
      pageContext?.setState(res);
    });
    localStorage.clear();
    setIsLoading(false);
    navigate('/page/1');
    detailContext?.setDetailId('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
      setIsHaveDog(true);
      setTimeout(() => {
        setIsHaveDog(false);
      }, 3000);
      data = await fetchData();
    }
    pageContext?.setState(data);
    setIsLoading(false);
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-form_input"
          type="text"
          value={searchQuery.trim()}
          onChange={handleInputChange}
          placeholder="Please enter search breed"
          autoFocus
          required
        ></input>
        <button className="search-form_button" type="submit">
          Search
          <img className="search-form_button__svg" src={search} alt="dog svg" />
        </button>
        <button className="search-form_button" type="button" onClick={resetSearch}>
          Reset
          <img className="search-form_button__svg" src={resetSearchImg} alt="dog svg crossed out" />
        </button>
      </form>
      {isLoading && <LoadingSnippet />}
      {isHaveDog && <ModalBoundary />}
    </>
  );
}

export { SearchForm };
