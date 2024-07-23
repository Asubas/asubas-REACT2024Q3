// import '@testing-library/jest-dom';
// import { render, RenderOptions } from '@testing-library/react';
// import { ReactElement, PropsWithChildren } from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { rootReducer, RootState } from '../app/rootReducer';
// import { AppDispatch } from '../app/store';

// // Define the type for your extended render options
// interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
//   preloadedState?: Partial<RootState>;
//   store?: ReturnType<typeof configureStore>;
// }

// // Create a helper function to render with all necessary providers
// export function renderWithProviders(
//   ui: ReactElement,
//   { preloadedState = {}, store = configureStore({ reducer: rootReducer, preloadedState }), ...renderOptions }: ExtendedRenderOptions = {}
// ) {
//   function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {

//       <Provider store={store}>
//         <MemoryRouter>{children}</MemoryRouter>
//       </Provider>

//   }

//   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
// }
