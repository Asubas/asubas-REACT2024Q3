import './searchForm.scss';
import Image from 'next/image';
import { LoadingSnippet } from '../loadingSnippet/loadingSnippet';
import { IBreedProps } from '../../interfaces/breedProps';
import { ModalBoundary } from '../../modalBoundary/modalBoundary';
import search from '../../../src/assets/button-search-dog.svg';
import resetSearchImg from '../../../src/assets/button-search-dog-v2.svg';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSearchQuery } from '../../userHooks/useSearchQuery';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../app/slices/dataSlice';
import { useLazyFetchBreedsQuery, useLazyFetchImagesQuery } from '../../api/api';
import { setIsPagination } from '../../app/slices/paginationSlice';
import { setIsReset } from '../../app/slices/resetSlice';
import { setDetails } from '../../app/slices/detailsSlice';
import { ResetButton } from '../resetButton/resetButton';
import { setIsSearchResult } from '../../app/slices/searchResult';
import { RootState } from '../../app/store';

function SearchForm() {
  const dispatch = useDispatch();
  const isReset = useSelector((state: RootState) => state.reset);
  const [callAllBreeds] = useLazyFetchBreedsQuery();
  const [callSearchFetch] = useLazyFetchImagesQuery();
  const [searchQuery, setSearchQuery] = useSearchQuery('') as [string, (newQuery: string) => void];
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [isHaveDog, setIsHaveDog] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    setInputValue(searchQuery);
    dispatch(setIsReset(false));
  }, [dispatch, searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearchQuery(event.target.value);
  };

  const resetSearch = () => {
    setSearchQuery('');
    setIsLoading(true);
    // navigate('/page0');
    setInputValue('');
    setIsLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const allBreeds = await callAllBreeds({});
    if (!allBreeds.data || !Array.isArray(allBreeds.data)) return;
    const firstMatch = allBreeds.data.find((dog: IBreedProps) =>
      dog.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (firstMatch) {
      dispatch(setIsPagination(false));
      dispatch(setDetails(''));
      dispatch(setIsSearchResult(true));
      localStorage.setItem('resultSearch', firstMatch.id);
      localStorage.setItem('textSearch', searchQuery.toLowerCase().trim());
      const test = await callSearchFetch({ searchRequest: firstMatch.id, page: 0 });
      dispatch(setData(test.data));
    } else {
      setIsLoading(false);
      setIsHaveDog(true);
      setTimeout(() => {
        setIsHaveDog(false);
      }, 3000);
    }
    setIsLoading(false);
  };

  if (!isReset) return null;
  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-form_input"
          type="text"
          value={isReset.isReset ? '' : inputValue}
          onChange={handleInputChange}
          placeholder="Please enter search breed"
          autoFocus
          required
        ></input>
        <button className="search-form_button" type="submit">
          Search
          <Image
            className="search-form_button__svg"
            src={search.src}
            alt="dog svg"
            width={20}
            height={20}
          />
        </button>
        <ResetButton onReset={resetSearch} className="search-form_button" type="button">
          Reset
          <Image
            className="search-form_button__svg"
            src={resetSearchImg.src}
            alt="dog svg crossed out"
            width={20}
            height={20}
          />
        </ResetButton>
      </form>

      {isLoading && <LoadingSnippet />}
      {isHaveDog && <ModalBoundary />}
    </>
  );
}

export { SearchForm };
