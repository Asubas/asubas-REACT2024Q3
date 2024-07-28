import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { SearchForm } from '../components/searchForm/searchForm';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import { store } from '../app/store';

beforeEach(() => {
  fetchMock.resetMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

test('SearchForm', async () => {
  const user = userEvent.setup();

  fetchMock.mockResponseOnce(JSON.stringify([{ id: 'labrador', name: 'Labrador' }]));

  fetchMock.mockResponseOnce(JSON.stringify([{ id: 'dog1', url: 'https://example.com/dog1.jpg' }]));

  render(
    <MemoryRouter>
      <Provider store={store}>
        <SearchForm />
      </Provider>
    </MemoryRouter>,
  );

  const inputElement = screen.getByRole('textbox');
  await user.type(inputElement, 'labr');
  expect(inputElement).toHaveValue('labr');
  await waitFor(() => {
    user.click(screen.getByRole('button', { name: /search/i }));
  });
  const modal = await screen.findByText(/Please wait, dogs coming to you 🐕🐕🐕/i, {
    exact: false,
  });
  expect(modal).toBeInTheDocument();
  const element = await screen.findByText(/Search/i, {
    exact: false,
  });
  expect(element).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /reset/i }));
  expect(inputElement).toHaveValue('');

  await user.type(inputElement, 'asfz');
  expect(inputElement).toHaveValue('asfz');
  await user.click(screen.getByRole('button', { name: /search/i }));
  await waitFor(() => {
    expect(screen.getByText(/Please wait, dogs coming to you 🐕🐕🐕/i)).toBeInTheDocument();
  });
});
