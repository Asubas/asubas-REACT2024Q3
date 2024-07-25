import { combineReducers } from 'redux';
import dataSlice from './slices/dataSlice';
import paginationSlice from './slices/paginationSlice';
import resetSlice from './slices/resetSlice';
import detailsSlice from './slices/detailsSlice';
import favoriteSlice from './slices/favoriteSlice';
import searchResult from './slices/searchResult';
import { apiDog } from '../api/api';

const rootReducer = combineReducers({
  data: dataSlice,
  pagination: paginationSlice,
  reset: resetSlice,
  details: detailsSlice,
  favorite: favoriteSlice,
  searchResult: searchResult,
  [apiDog.reducerPath]: apiDog.reducer,
});

export { rootReducer };
export type RootStateReducer = ReturnType<typeof rootReducer>;
