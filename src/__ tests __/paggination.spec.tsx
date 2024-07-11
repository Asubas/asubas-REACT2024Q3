import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as services from '../api/requestApi';
import { Pagination } from '../components/pagination/pagination';

describe('Pagination', () => {
  it('please work', async () => {
    const mockFetchData = jest.spyOn(services, 'fetchData').mockImplementation(async () => {
      return [
        {
          breeds: [
            {
              name: 'Appenzeller Sennenhund',
            },
          ],
          height: 802,
          id: 'Bymjyec4m',
        },
      ];
    });

    render(
      <MemoryRouter>
        <Pagination />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getAllByRole('button', { name: /[0-9]+/ })[1]);
    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalled();
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });
});
