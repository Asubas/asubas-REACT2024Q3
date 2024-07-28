import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeContext } from '../App';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../app/rootReducer';
import { testState } from './testStore';
import { apiDog } from '../api/api';
import { RootState } from '../app/store';
import { ReactNode, useState } from 'react';

export const renderWithRedux = (ui: JSX.Element, preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState || testState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiDog.middleware),
  });

  const WrapperTest = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState('');
    return (
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
      </Provider>
    );
  };

  const { container, rerender, ...rest } = render(ui, {
    wrapper: ({ children }) => <WrapperTest>{children}</WrapperTest>,
  });

  const element = container;
  return { store, element, rerender, ...rest };
};
