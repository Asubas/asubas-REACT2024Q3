import '@testing-library/jest-dom';
import { act, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, useOutletContext } from 'react-router-dom';
import { DetailsPerDog } from '../components/contentSection/details/detailsPerDog';
import { renderWithRedux } from '../tests/test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
  useNavigate: jest.fn().mockReturnValue(['/page1']),
}));

describe('DetailsPerDog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('return correct data per dog', () => {
    (useOutletContext as jest.Mock).mockReturnValue({
      details: {
        id: '1',
        url: 'https://example.com/dog.jpg',
        breeds: [
          {
            name: 'Labrador',
            weight: { metric: '25-36' },
            height: { metric: '55-62' },
            bred_for: 'Companion',
            temperament: 'Friendly, Intelligent, Even Tempered',
          },
        ],
      },
    });

    const { element } = renderWithRedux(
      <MemoryRouter initialEntries={['/page1/SJZIJgqEX']}>
        <DetailsPerDog />
      </MemoryRouter>,
    );
    expect(element).toBeDefined();
    expect(screen.getByText('Labrador')).toBeInTheDocument();
    expect(screen.getByText('25-36 kG')).toBeInTheDocument();
    expect(screen.getByText('55-62 centimeter')).toBeInTheDocument();
    expect(screen.getByText('Companion')).toBeInTheDocument();
    expect(screen.getByText('Close details')).toBeInTheDocument();
  });

  test('should not render if details.id is falsy', () => {
    (useOutletContext as jest.Mock).mockReturnValue({
      details: {
        id: '',
        url: '',
        breeds: [],
      },
    });

    const { element } = renderWithRedux(
      <MemoryRouter initialEntries={['/page1/SJZIJgqEX']}>
        <DetailsPerDog />
      </MemoryRouter>,
    );
    expect(element).toBeDefined();

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('navigates to the correct path on close button click', async () => {
    const mockNavigate = jest.fn();
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    (useOutletContext as jest.Mock).mockReturnValue({
      details: {
        id: '1',
        url: 'https://example.com/dog.jpg',
        breeds: [
          {
            name: 'Labrador',
            weight: { metric: '25-36' },
            height: { metric: '55-62' },
            bred_for: 'Companion',
            temperament: 'Friendly, Intelligent, Even Tempered',
          },
        ],
      },
    });

    const { element } = renderWithRedux(
      <MemoryRouter initialEntries={['/page1/SJZIJgqEX']}>
        <DetailsPerDog />
      </MemoryRouter>,
    );

    expect(element).toBeDefined();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /close details/i }));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/page1');
  });
});
