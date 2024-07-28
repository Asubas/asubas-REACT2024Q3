import { useEffect, useRef } from 'react';

const useSearchQuery = (initialQuery: string) => {
  const searchQueryRef = useRef(initialQuery);
  useEffect(() => {
    const storedQuery = localStorage.getItem('textSearch');
    if (storedQuery) {
      searchQueryRef.current = storedQuery;
    }
  }, []);
  useEffect(() => {
    return () => {
      localStorage.setItem('textSearch', searchQueryRef.current);
    };
  }, []);
  return [
    searchQueryRef.current,
    (newQuery: string) => {
      searchQueryRef.current = newQuery;
    },
  ];
};

export { useSearchQuery };
