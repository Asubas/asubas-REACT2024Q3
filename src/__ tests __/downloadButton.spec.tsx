import '@testing-library/jest-dom';
import { fireEvent, screen, render, waitFor } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { DownloadButton } from '../components/contentSection/favoriteModal/downloadButton';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockFavoriteDogsArray = {
  initFavoriteArr: [
    {
      id: '1',
      breeds: [
        {
          name: 'Golden Retriever',
          bred_for: 'Retrieving',
          height: { imperial: '21-24' },
          weight: { imperial: '55-75' },
          life_span: '10-12 years',
          temperament: 'Friendly, Intelligent, Devoted',
        },
      ],
      url: 'https://example.com/dog1.jpg',
    },
  ],
};

describe('DownloadButton', () => {
  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockImplementation((callback) => {
      return callback({ favorite: mockFavoriteDogsArray } as RootState);
    });

    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the download button', () => {
    render(<DownloadButton />);
    const button = screen.getByRole('button', { name: /Download/i });
    expect(button).toBeInTheDocument();
  });

  it('should generate a download URL when the button is clicked', async () => {
    render(<DownloadButton />);
    const button = screen.getByRole('button', { name: /Download/i });
    await waitFor(() => {
      fireEvent.click(button);
    });
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('download', '1-cute-dog.csv');
    expect(link).toHaveAttribute('href', 'mocked-url');
  });

  it('should generate correct CSV content', async () => {
    render(<DownloadButton />);
    const button = screen.getByRole('button', { name: /Download/i });
    await waitFor(() => {
      fireEvent.click(button);
    });
    const link = screen.getByRole('link');
    const url = link.getAttribute('href');

    const csvContent =
      'Thank you for download! Good luck to study!!\n' +
      'Name dog  : Golden Retriever, Distinctive traits for the current breed  : Retrieving, ' +
      'Height  : 21-24, Weight  : 55-75, Life expectancy  : 10-12 years, ' +
      'Temperament  : Friendly, Intelligent, Devoted, Accompanying picture  : https%3A%2F%2Fexample.com%2Fdog1.jpg, ' +
      'The good boy/girl??? :    yeeees :3\n';

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        blob: () => Promise.resolve(new Blob([csvContent], { type: 'text/csv;charset=utf-8' })),
      }),
    );

    fetch(url as string)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const content = reader.result as string;
          expect(content).toContain('Thank you for download! Good luck to study!!');
          expect(content).toContain('Name dog  : Golden Retriever');
          expect(content).toContain('Distinctive traits for the current breed  : Retrieving');
          expect(content).toContain('Height  : 21-24');
          expect(content).toContain('Weight  : 55-75');
          expect(content).toContain('Life expectancy  : 10-12 years');
          expect(content).toContain('Temperament  : Friendly, Intelligent, Devoted');
          expect(content).toContain('Accompanying picture  : https%3A%2F%2Fexample.com%2Fdog1.jpg');
          expect(content).toContain('The good boy/girl??? :    yeeees :3');
        };
        reader.readAsText(blob);
      });
  });
});
