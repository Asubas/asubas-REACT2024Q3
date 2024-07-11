import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContentItem } from '../components/contentSection/contentItem/contentItem';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('ContentItem', () => {
  const mockItem = {
    id: '1',
    url: 'https://example.com/dog.jpg',
    width: 100,
    height: 100,
    breeds: [
      {
        name: 'Akita',
        height: {
          imperial: '',
          metric: '',
        },
        weight: {
          imperial: '',
          metric: '',
        },
        bred_for: '',
        life_span: '',
        temperament: '',
      },
    ],
  };

  const mockShowDetail = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dogs/1' });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
  });

  it('correct render', () => {
    render(
      <MemoryRouter>
        <ContentItem item={mockItem} showDetail={mockShowDetail} />
      </MemoryRouter>,
    );

    expect(screen.getByAltText(`Dog ${mockItem.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockItem.breeds[0].name)).toBeInTheDocument();
  });

  it('return showDetail', async () => {
    render(
      <MemoryRouter>
        <ContentItem item={mockItem} showDetail={mockShowDetail} />
      </MemoryRouter>,
    );

    const contentItem = screen.getByRole('img', { name: `Dog ${mockItem.id}` });
    fireEvent.click(contentItem);

    await waitFor(() => {
      expect(mockShowDetail).toHaveBeenCalledWith(mockItem.id);
      expect(useNavigate()).toHaveBeenCalledWith('/dogs/1');
    });
  });

  it('return loading snippet', async () => {
    render(
      <MemoryRouter>
        <ContentItem item={mockItem} showDetail={mockShowDetail} />
      </MemoryRouter>,
    );

    const contentItem = screen.getByRole('img', { name: `Dog ${mockItem.id}` });
    fireEvent.click(contentItem);

    await waitFor(
      () => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      },
      { timeout: 4000 },
    );
  });
});
