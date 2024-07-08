import { useEffect, useState } from 'react';
import { fetchData } from '../api/requestApi';

function useReturnData() {
  const [stateData, setStateData] = useState(null);

  useEffect(() => {
    const fetchAndUpdateData = async () => {
      const data = localStorage.getItem('resultSearch')
        ? await fetchData(Number(localStorage.getItem('resultSearch')))
        : await fetchData();
      setStateData(data);
    };
    fetchAndUpdateData();
  }, []);

  return stateData;
}

export { useReturnData };
