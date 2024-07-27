// import { render, screen, fireEvent, act } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter, MemoryRouter } from 'react-router-dom';
// import configureStore from 'redux-mock-store';
// import '@testing-library/jest-dom';
// import { ContentItem } from '../components/contentSection/contentItem/contentItem';
// // import { addFavorite, removeFavorite } from '../app/slices/favoriteSlice';
// import { renderWithRedux } from '../tests/test-utils';

// const mockStore = configureStore([]);
// const mockItem = {
//   breeds: [
//     {
//       name: 'Bulldog',
//       height: {
//         imperial: '14 - 15',
//         metric: '35 - 38',
//       },
//       weight: {
//         imperial: '40 - 50',
//         metric: '18 - 23',
//       },
//       bred_for: 'Bull baiting',
//       life_span: '8 - 10 years',
//       temperament: 'Docile, Willful, Friendly',
//     },
//   ],
//   height: 1,
//   width: 1,
//   id: '1',
//   url: 'https://example.com/dog.jpg',
// };

// const initialState = {
//   favorite: { initFavoriteArr: [] },
// };

// const renderComponent = (state = initialState) => {
//   const store = mockStore(state);

//   const { element } = renderWithRedux(
//     <MemoryRouter initialEntries={['/page1']}>
//       <ContentItem item={mockItem} showDetail={jest.fn()} />
//     </MemoryRouter>,
//   );
//   expect(element).toBeDefined();

//   return store;
// };

// describe('ContentItem', () => {
//   test('renders the content item with image and title', () => {
//     renderComponent();

//     expect(screen.getByAltText(`Dog ${mockItem.id}`)).toBeInTheDocument();
//     expect(screen.getByText(mockItem.breeds[0].name)).toBeInTheDocument();
//   });

//   test('checkbox is initially unchecked', () => {
//     renderComponent();

//     // const checkbox = screen.getByTestId('checkbox-input');
//     // expect(checkbox).not.toBeChecked();
//   });

//   test('clicking the label toggles the checkbox', async () => {
//     // const store = renderComponent();
//     // const checkbox = screen.getByTestId('checkbox-input');
//     // expect(checkbox).not.toBeChecked();
//     // Click label to check the checkbox
//     // await act(async () => {
//     // fireEvent.click(checkbox);
//   });
//   // expect(checkbox).toBeChecked();
//   // expect(store.getActions()).toEqual([addFavorite(mockItem)]);

//   // Click label to uncheck the checkbox
//   // fireEvent.click(checkbox);
//   // expect(checkbox).not.toBeChecked();
//   // expect(store.getActions()).toEqual([addFavorite(mockItem), removeFavorite(mockItem)]);
// });

// test('shows details and navigates when clicking the content item (except checkbox and label)', () => {
//   const showDetailMock = jest.fn();
//   const store = mockStore(initialState);
//   // const pathParts = ['path', 'to'];

//   render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <ContentItem item={mockItem} showDetail={showDetailMock} />
//       </BrowserRouter>
//     </Provider>,
//   );

//   const contentItem = screen.getByAltText(`Dog ${mockItem.id}`).closest('.content_item');
//   const checkbox = screen.getByTestId('checkbox-input');
//   const label = screen.getByTestId('label');

//   // Mock useNavigate to verify navigation
//   const navigate = jest.fn();
//   // jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

//   // Click content item
//   fireEvent.click(contentItem as Element);
//   expect(showDetailMock).toHaveBeenCalledWith(mockItem.id);
//   // expect(navigate).toHaveBeenCalledWith(`/${pathParts[1]}/${mockItem.id}`);

//   // Click checkbox and label to ensure they do not trigger navigation
//   fireEvent.click(checkbox);
//   expect(navigate).toHaveBeenCalledTimes(1); // navigate should not be called again

//   fireEvent.click(label);
//   expect(navigate).toHaveBeenCalledTimes(1); // navigate should not be called again
// });
