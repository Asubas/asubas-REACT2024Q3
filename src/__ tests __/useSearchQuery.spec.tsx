import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { useSearchQuery } from '../userHooks/useSearchQuery';

describe('useSearchQuery', () => {
  const initialLocalStorageItem = 'initial-search-query';

  beforeEach(() => {
    localStorage.setItem('textSearch', initialLocalStorageItem);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('return local storage query', () => {
    const { result } = renderHook(() => useSearchQuery('initial-search-query'));

    expect(result.current[0]).toBe(initialLocalStorageItem);
  });

  it('update local storage query', () => {
    const { result } = renderHook(() => useSearchQuery('default-query'));
    const [, setSearchQuery] = result.current as [string, (newQuery: string) => void];
    waitFor(() => {
      setSearchQuery('new-search-query');
    });

    expect(localStorage.getItem('textSearch')).toBe('initial-search-query');
  });
});
