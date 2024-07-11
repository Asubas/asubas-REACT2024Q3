import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation, Outlet } from 'react-router-dom';
import { DetailsContext } from '../App';
import { ContentSection } from '../components/contentSection/contentSection';
import { fetchDataDetails } from '../api/requestAllBreeds';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  Outlet: jest.fn(),
}));

jest.mock('../api/requestAllBreeds', () => ({
  fetchDataDetails: jest.fn(),
}));
describe('ContentSection', () => {
  const mockData = [
    {
      id: '1',
      url: 'https://example.com/dog1.jpg',
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
    },
    {
      id: '2',
      url: 'https://example.com/dog2.jpg',
      width: 200,
      height: 200,
      breeds: [
        {
          name: 'labrador',
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
    },
  ];

  const mockDetailData = {
    id: '1',
    url: 'https://example.com/dog1.jpg',
    width: 100,
    height: 100,
    breeds: [
      {
        name: 'Labrador',
        weight: { metric: '25-36' },
        height: { metric: '55-62' },
        bred_for: 'Companion',
        life_span: '10-12 years',
        temperament: 'Friendly, Intelligent, Even Tempered',
      },
    ],
  };

  const mockSetDetailId = jest.fn();
  const mockDetailId = '';

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dogs' });
    (Outlet as jest.Mock).mockImplementation(({ context }) => (
      <div>Detail: {context.details.id}</div>
    ));
    (fetchDataDetails as jest.Mock).mockResolvedValue(mockDetailData);
  });

  it('correct render', () => {
    render(
      <MemoryRouter>
        <DetailsContext.Provider value={{ setDetailId: mockSetDetailId, detailId: mockDetailId }}>
          <ContentSection data={mockData} />
        </DetailsContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('correct render', async () => {
    render(
      <MemoryRouter>
        <DetailsContext.Provider value={{ setDetailId: mockSetDetailId, detailId: mockDetailId }}>
          <ContentSection data={mockData} />
        </DetailsContext.Provider>
      </MemoryRouter>,
    );

    const contentItem = screen.getAllByRole('img')[0];
    fireEvent.click(contentItem);
  });

  it('correct render', () => {
    render(
      <MemoryRouter>
        <DetailsContext.Provider value={{ setDetailId: mockSetDetailId, detailId: 'detail' }}>
          <ContentSection data={mockData} />
        </DetailsContext.Provider>
      </MemoryRouter>,
    );

    const contentSection = screen.getByRole('main');
    fireEvent.click(contentSection);
  });
});
