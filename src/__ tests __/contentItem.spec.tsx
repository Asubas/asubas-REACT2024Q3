import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import '@testing-library/jest-dom';
import { ContentItem } from '../components/contentSection/contentItem/contentItem';
import { addFavorite, removeFavorite } from '../app/slices/favoriteSlice';
import { ReactElement } from 'react';

type StoreType = MockStoreEnhanced<unknown, unknown>;
const renderWithStore = (store: StoreType, ui: ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/page1']}>{ui}</MemoryRouter>
    </Provider>,
  );
};
const mockStore = configureStore([]);
const mockItem = {
  breeds: [
    {
      name: 'Bulldog',
      height: {
        imperial: '14 - 15',
        metric: '35 - 38',
      },
      weight: {
        imperial: '40 - 50',
        metric: '18 - 23',
      },
      bred_for: 'Bull baiting',
      life_span: '8 - 10 years',
      temperament: 'Docile, Willful, Friendly',
    },
  ],
  height: 1,
  width: 1,
  id: '1',
  url: 'https://example.com/dog.jpg',
};

const initialState = {
  favorite: { initFavoriteArr: [] },
};

const renderComponent = (state = initialState) => {
  const store = mockStore(state);
  renderWithStore(store, <ContentItem item={mockItem} showDetail={jest.fn()} />);
  return store;
};

describe('ContentItem', () => {
  test('checkbox is initially unchecked', () => {
    renderComponent();
    const checkbox = screen.getByTestId('checkbox-input');
    expect(checkbox).not.toBeChecked();
  });

  test('clicking the checkbox toggles its state and dispatches actions', async () => {
    const store = renderComponent();
    const checkbox = screen.getByTestId('checkbox-input');
    expect(checkbox).not.toBeChecked();

    await act(async () => {
      fireEvent.click(checkbox);
    });
    expect(checkbox).toBeChecked();
    expect(store.getActions()).toEqual([addFavorite(mockItem)]);

    await act(async () => {
      fireEvent.click(checkbox);
    });
    expect(checkbox).not.toBeChecked();
    expect(store.getActions()).toEqual([addFavorite(mockItem), removeFavorite(mockItem)]);
  });
});
