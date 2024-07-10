import { useEffect, useState } from 'react';
import { fetchData } from '../api/requestApi';
import { useLocation } from 'react-router-dom';

function useReturnData() {
  const [stateData, setStateData] = useState(null);
  const { pathname } = useLocation();
  useEffect(() => {
    const pathParts = pathname.split('page');
    const urlPart = pathParts[1].split('/');
    const fetchAndUpdateData = async () => {
      const data = localStorage.getItem('resultSearch')
        ? await fetchData(Number(localStorage.getItem('resultSearch')))
        : await fetchData(0, Number(urlPart[0]));
      setStateData(data);
    };
    fetchAndUpdateData();
  }, [pathname]);

  return stateData;
}

export { useReturnData };
