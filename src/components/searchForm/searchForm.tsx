import './searchForm.scss';
import { LoadingSnippet } from '../loadingSnippet/loadingSnippet';
import { IBreedProps } from '../../interfaces/breedProps';
import { ModalBoundary } from '../../modalBoundary/modalBoundary';
import search from '../../assets/button-search-dog.svg';
import resetSearchImg from '../../assets/button-search-dog-v2.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchQuery } from '../../userHooks/useSearchQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setData } from '../../app/slices/dataSlice';
import { useFetchBreedsQuery, useFetchDetailsQuery } from '../../app/slices/apiSlice';
import { setIsPagination } from '../../app/slices/paginationSlice';
import { setIsReset } from '../../app/slices/resetSlice';
import { setDetails } from '../../app/slices/detailsSlice';

function SearchForm() {
  const dispatch = useDispatch();
  // useSelector((state: RootState) => state.rootReducer.data);
  const isReset = useSelector((state: RootState) => state.rootReducer.reset);
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
    dispatch(setIsReset(false));
  }, [dispatch, searchQuery]);

  const resetSearch = async () => {
    setSearchQuery('');
    setIsLoading(true);
    dispatch(setIsPagination(true));
    setInputValue('');
    dispatch(setData(useFetchBreedsQuery({})));
    localStorage.clear();
    setIsLoading(false);
    navigate('/page0');
    dispatch(setDetails(''));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { data, error, isLoading } = useFetchBreedsQuery({});

    const firstMatch = data.find((dog: IBreedProps) =>
      dog.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    let data1;
    if (firstMatch) {
      dispatch(setIsPagination(false));

      dispatch(setDetails(''));
      localStorage.setItem('resultSearch', firstMatch.id);
      localStorage.setItem('textSearch', searchQuery.toLowerCase().trim());
      data1 = useFetchDetailsQuery({ sub_id: firstMatch.id });
    } else {
      setIsLoading(false);
      setIsHaveDog(true);
      setTimeout(() => {
        setIsHaveDog(false);
      }, 3000);
      data1 = useFetchBreedsQuery({});
    }
    dispatch(setData(data1));
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
