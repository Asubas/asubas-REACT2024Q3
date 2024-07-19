import { useDispatch } from 'react-redux';
import { setData } from '../app/slices/dataSlice';
import { setDetails } from '../app/slices/detailsSlice';
import { setIsPagination } from '../app/slices/paginationSlice';
import { useLazyFetchImagesQuery } from './api';

interface ResetButtonProps {
  onReset: () => void;
  onResetSearch: () => void;
  children?: React.ReactNode;
  className: string;
  type: 'button';
}
function ResetButton(props: ResetButtonProps) {
  const [callSearchFetch] = useLazyFetchImagesQuery();
  const dispatch = useDispatch();
  const reset = async () => {
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
    ></button>
  );
}

export { ResetButton };
