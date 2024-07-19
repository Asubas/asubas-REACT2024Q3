import { useDispatch } from 'react-redux';
import { setData } from '../app/slices/dataSlice';
import { setDetails } from '../app/slices/detailsSlice';
import { setIsPagination } from '../app/slices/paginationSlice';
import { useLazyFetchImagesQuery } from './api';
interface ResetButtonProps {
  onReset: () => void;
  onResetSearch: () => void;
}
function ResetButton(props: ResetButtonProps) {
  const [callSearchFetch] = useLazyFetchImagesQuery();
  const dispatch = useDispatch();
  const reset = async () => {
    console.log('а тут');
    localStorage.clear();
    dispatch(setIsPagination(true));
    dispatch(setDetails(''));
    const test = await callSearchFetch({ searchRequest: 0, page: 0 });
    dispatch(setData(test.data));
  };
  return (
    <button
      onClick={() => {
        reset();
        props.onResetSearch();
      }}
      {...props}
    >
      {' '}
      RESETTTS{' '}
    </button>
  );
}

export { ResetButton };
