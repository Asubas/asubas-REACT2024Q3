// import { render, fireEvent, waitFor } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import '@testing-library/jest-dom';
// import { rootReducer } from '../app/rootReducer';
// import { FavoriteModal } from '../components/contentSection/favoriteModal/favoriteModal';
// import { MemoryRouter } from 'react-router-dom';
// import { ReactNode } from 'react';
// import { JSX } from 'react/jsx-runtime';
// import { configureStore } from '@reduxjs/toolkit';
// // import { addFavorite } from '../app/slices/favoriteSlice';
// import { testState } from '../tests/testStore';

// // Mock Redux store
// const renderWithRedux = (
//   component: string | number | boolean | Iterable<ReactNode> | JSX.Element | null | undefined,
//   {
//     testState,
//     store = configureStore({ reducer: rootReducer, preloadedState: initialState }),
//   } = {},
// ) => {
//   return {
//     ...render(<Provider store={store}>{component}</Provider>),
//     store,
//   };
// };

// describe('FavoriteModal component', () => {
//   it('renders modal correctly when open', () => {
//     const { getByText, getByTestId } = render(
//       <MemoryRouter>
//         <Provider store={store}>
//           <FavoriteModal />
//         </Provider>
//       </MemoryRouter>,
//     );

//     // Check modal title
//     expect(
//       getByText(
//         'Congratulations! You feed these dogs! Would you like to reset and do it again or download?',
//       ),
//     ).toBeInTheDocument();

//     // Check if modal is initially open
//     expect(getByTestId('favorite-modal').classList).toContain('favorite-modal');
//   });

//   it('renders the correct number of favorite dogs', async () => {
//     const mockFavoriteDogs = [
//       { id: 1, breeds: [{ name: 'Dog Breed 1' }], url: 'mock-url-1' },
//       { id: 2, breeds: [{ name: 'Dog Breed 2' }], url: 'mock-url-2' },
//     ];

//     const initialState = {
//       favoriteDogsArray: {
//         initFavoriteArr: mockFavoriteDogs,
//       },
//     };

//     const { getByText, getAllByTestId } = renderWithRedux(<FavoriteModal />, { initi });

//     // Wait for the favorite cards to appear in the DOM
//     await waitFor(() => {
//       const favoriteCards = getAllByTestId('favorite-card');
//       expect(favoriteCards).toHaveLength(mockFavoriteDogs.length);
//       favoriteCards.forEach((card, index) => {
//         const breedName = mockFavoriteDogs[index].breeds[0].name;
//         expect(card).toHaveTextContent(breedName);
//       });
//     });

//     // Additional assertion for the counter text
//     await waitFor(() => {
//       expect(getByText(`Fed to the dogs: ${mockFavoriteDogs.length}`)).toBeInTheDocument();
//     });
//   });

//   it('calls handleResetClick and navigates on reset button click', () => {
//     const { getByText } = render(
//       <Provider store={store}>
//         <FavoriteModal />
//       </Provider>,
//     );

//     // Mock favorite dogs in Redux state
//     const mockFavoriteDogs = [
//       { id: 1, breeds: [{ name: 'Dog Breed 1' }], url: 'mock-url-1', width: 100, height: 100 },
//       { id: 2, breeds: [{ name: 'Dog Breed 2' }], url: 'mock-url-2', width: 120, height: 120 },
//     ];

//     store.dispatch({ type: 'FAVORITE_ADD', payload: mockFavoriteDogs });

//     // Simulate reset button click
//     fireEvent.click(getByText('Reset store'));

//     // Check if removeFavorite action was dispatched for each favorite dog
//     expect(store.getState().favorite).toHaveLength(0); // Assuming removeFavorite removes all favorites

//     // Check navigation after reset
//     expect(window.location.pathname).toBe('/mockpath'); // Replace with expected path
//   });

//   it('closes modal on close button click', () => {
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <FavoriteModal />
//       </Provider>,
//     );

//     // Simulate close button click
//     fireEvent.click(getByTestId('favorite-modal-close'));

//     // Check if modal is closed
//     expect(getByTestId('favorite-modal').classList).toContain('unShow-modal');
//   });
// });
