import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { apiDog } from '../api/api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiDog.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof store.replaceReducer>;
setupListeners(store.dispatch);
