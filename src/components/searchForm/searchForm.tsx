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
import { useSearchQuery } from '../../userHooks/useSearchQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setData } from '../../app/dataSlice';

function SearchForm() {
  const { setIsPagination, isReset, setIsReset } = useContext<IPageContextInterface>(PageContext);
  const { setDetailId } = useContext<IDetailSectionContext>(DetailsContext);
  const dispatch = useDispatch();
  useSelector((state: RootState) => state.data);
  const [searchQuery, setSearchQuery] = useSearchQuery('') as [string, (newQuery: string) => void];
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [isHaveDog, setIsHaveDog] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    setInputValue(searchQuery);
    setIsReset(false);
  }, [searchQuery, setIsReset]);

  const resetSearch = async () => {
    setSearchQuery('');
    setIsLoading(true);
    setIsPagination(true);
    setInputValue('');
    fetchData().then((res) => {
      dispatch(setData(res));
    });
    localStorage.clear();
    setIsLoading(false);
    navigate('/page0');
    setDetailId('');
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
      setIsPagination(false);
      setDetailId('');
      localStorage.setItem('resultSearch', firstMatch.id);
      localStorage.setItem('textSearch', searchQuery.toLowerCase().trim());
      data = await fetchData(firstMatch.id, 0);
    } else {
      setIsLoading(false);
      setIsHaveDog(true);
      setTimeout(() => {
        setIsHaveDog(false);
      }, 3000);
      data = await fetchData();
    }
    dispatch(setData(data));
    setIsLoading(false);
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-form_input"
          type="text"
          value={isReset ? '' : inputValue}
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
