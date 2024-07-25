import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as detailsSlice from '../app/slices/detailsSlice';
import { ContentSection } from '../components/contentSection/contentSection';

import { renderWithRedux } from '../tests/test-utils';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockReturnValue(['/pag1']),
}));
jest.mock('../app/slices/detailsSlice', () => {
  return {
    ...jest.requireActual('../app/slices/detailsSlice'),
    setDetails: jest.fn(() => ({ type: 'mock-set-details', payload: '1' })),
  };
});

describe('ContentSection', () => {
  it('should dispatch setDetails action when content item is clicked and load details', async () => {
    const mockNavigate = jest.fn();
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    const { element } = renderWithRedux(
      <MemoryRouter initialEntries={['/page1']}>
        <ContentSection />
      </MemoryRouter>,
    );
    expect(element).toBeDefined();
    const findAllLabradors = await screen.findAllByText(/Labrador Retriever/i);
    findAllLabradors.forEach((goodDog) => {
      expect(goodDog).toBeInTheDocument();
    });
    fireEvent.click(findAllLabradors[0]);
    expect(detailsSlice.setDetails).toHaveBeenCalledWith('1');
    expect(mockNavigate).toHaveBeenCalledWith('/page1/1');
    expect(detailsSlice.setDetails).toHaveBeenCalledWith('1');

    const FindAllRetrievers = await screen.findAllByText(/Golden Retriever/i);
    FindAllRetrievers.forEach((goodDog) => {
      expect(goodDog).toBeInTheDocument();
    });
  });

  // it('should display loading and error states correctly', async () => {
  //   jest.spyOn(console, 'error').mockImplementation(() => {});

  //   jest.mocked(useFetchImagesQuery).mockReturnValue({
  //     data: undefined,
  //     isFetching: true,
  //     error: null,
  //     refetch: function (): QueryActionCreatorResult<
  //       QueryDefinition<
  //         unknown,
  //         BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
  //         never,
  //         unknown,
  //         'api'
  //       >
  //     > {
  //       throw new Error('Function not implemented.');
  //     },
  //   });

  //   jest.mocked(useFetchDetailsQuery).mockReturnValue({
  //     data: undefined,
  //     isFetching: true,
  //     error: new Error('API error'),
  //     refetch: function (): QueryActionCreatorResult<
  //       QueryDefinition<
  //         unknown,
  //         BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
  //         never,
  //         unknown,
  //         'api'
  //       >
  //     > {
  //       throw new Error('Function not implemented.');
  //     },
  //   });

  //   const { element } = renderWithRedux(
  //     <MemoryRouter initialEntries={['/page1']}>
  //       <ContentSection />
  //     </MemoryRouter>,
  //   );
  //   expect(element).toBeDefined();

  //   expect(screen.getByText(/Loading/i)).toBeInTheDocument();

  //   await waitFor(() => {
  //     expect(screen.getByText(/404/i)).toBeInTheDocument();
  //   });
  // });
});
