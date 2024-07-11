import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as services from '../api/requestAllBreeds';
import * as options from '../api/requestApi';
import { render, screen } from '@testing-library/react';
import { SearchForm } from '../components/searchForm/searchForm';
import { MemoryRouter } from 'react-router-dom';

test('SearchForm', async () => {
  const user = userEvent.setup();

  const mockFetchDataBreeds = jest
    .spyOn(services, 'fetchDataBreeds')
    .mockImplementation(async () => [{ id: 'labrador', name: 'Labrador' }]);

  const mockFetchDataDetails = jest
    .spyOn(services, 'fetchDataDetails')
    .mockImplementation(async (id) => [{ id: `${id}` }]);

  const mockFetchData = jest.spyOn(options, 'fetchData').mockImplementation(async () => null);

  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>,
  );

  const inputElement = screen.getByRole('textbox');
  await user.type(inputElement, 'labr');
  expect(inputElement).toHaveValue('labr');
  await user.click(screen.getByRole('button', { name: /search/i }));
  await user.click(screen.getByRole('button', { name: /reset/i }));
  expect(inputElement).toHaveValue('');
  mockFetchDataBreeds.mockRestore();
  mockFetchDataDetails.mockRestore();
  mockFetchData.mockRestore();
});
