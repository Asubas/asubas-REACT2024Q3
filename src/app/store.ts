import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/FormSlices';
import countryReducer from './slices/CountrySlices';

export const store = configureStore({
  reducer: {
    form: formReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
