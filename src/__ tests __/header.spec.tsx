import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as services from '../api/requestApi';
import { Header } from '../components/header/header';

test('Renders the header section', async () => {
  const user = userEvent.setup();
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
      <Header />
    </MemoryRouter>,
  );
  const imageElement = screen.getByAltText('dog picture');
  await user.click(imageElement);
  expect(localStorage.getItem('resultSearch')).toBeNull();
  expect(localStorage.getItem('textSearch')).toBeNull();
  await waitFor(() => {
    expect(mockFetchData).toHaveBeenCalled();
  });
});
