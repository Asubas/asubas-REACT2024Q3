import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useOutletContext } from 'react-router-dom';
import { useContext } from 'react';
import { DetailsPerDog } from '../components/contentSection/details/detailsPerDog';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
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

    (useContext as jest.Mock).mockReturnValue({
      setDetailId: jest.fn(),
    });

    render(<DetailsPerDog />);

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

    (useContext as jest.Mock).mockReturnValue({
      setDetailId: jest.fn(),
    });

    render(<DetailsPerDog />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
