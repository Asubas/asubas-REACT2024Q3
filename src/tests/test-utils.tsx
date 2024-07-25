import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeContext } from '../App';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../app/rootReducer';
import { testState } from './testStore';
import { apiDog } from '../api/api';
import { RootState } from '../app/store';

export const renderWithRedux = (ui: JSX.Element, preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState || testState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiDog.middleware),
  });

  const { container, rerender, ...rest } = render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light', setTheme: jest.fn() }}>
          {children}
        </ThemeContext.Provider>
      </Provider>
    ),
  });

  const element = container;
  return { store, element, rerender, ...rest };
};
