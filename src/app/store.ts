import { configureStore } from '@reduxjs/toolkit';
import { apiDog } from '../api/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from './rootReducer';
export const store = configureStore({
  reducer: {
    rootReducer,
    [apiDog.reducerPath]: apiDog.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiDog.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store.replaceReducer>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
