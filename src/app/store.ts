import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';
import { apiDog } from './slices/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    data: dataSlice,
    [apiDog.reducerPath]: apiDog.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiDog.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
