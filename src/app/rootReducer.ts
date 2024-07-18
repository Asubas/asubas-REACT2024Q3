import { combineReducers } from 'redux';
import dataSlice from './slices/dataSlice';
import paginationSlice from './slices/paginationSlice';
import resetSlice from './slices/resetSlice';

const rootReducer = combineReducers({
  data: dataSlice,
  pagination: paginationSlice,
  reset: resetSlice,
});

export { rootReducer };
