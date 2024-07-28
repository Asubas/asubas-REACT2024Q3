import '@testing-library/jest-dom';
import { useFetchBreedsQuery, useFetchDetailsQuery, useFetchImagesQuery } from '../api/api';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { store } from '../app/store';
import { Provider } from 'react-redux';

function Wrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

const mockBreeds = [
  { id: 1, name: 'Labrador Retriever' },
  { id: 2, name: 'Golden Retriever' },
];

const mockDetails = {
  id: '1',
  url: 'https://cdn2.thedogapi.com/images/1.jpg',
};

const mockImages = [
  {
    id: '1',
    url: 'https://cdn2.thedogapi.com/images/1.jpg',
    breeds: [{ id: 1, name: 'Labrador Retriever' }],
  },
];

beforeAll(() => {
  fetchMock.resetMocks();
});

describe('Redux Toolkit Query Tests', () => {
  it('renders useFetchBreedsQuery hook and fetches breeds successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockBreeds), { status: 200 });

    const { result } = renderHook(() => useFetchBreedsQuery({}), { wrapper: Wrapper });

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'fetchBreeds',
      isLoading: true,
      isSuccess: false,
      isError: false,
      currentData: undefined,
      isFetching: true,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName: 'fetchBreeds',
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: mockBreeds,
      isFetching: false,
    });
  });

  it('renders useFetchDetailsQuery hook and fetches details successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDetails), { status: 200 });

    const { result } = renderHook(() => useFetchDetailsQuery({ sub_id: '1' }), {
      wrapper: Wrapper,
    });

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'fetchDetails',
      isLoading: true,
      isSuccess: false,
      isError: false,
      currentData: undefined,
      isFetching: true,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName: 'fetchDetails',
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: mockDetails,
      isFetching: false,
    });
  });

  it('renders useFetchImagesQuery hook and fetches images successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockImages), { status: 200 });

    const { result } = renderHook(() => useFetchImagesQuery({ searchRequest: 0, page: 0 }), {
      wrapper: Wrapper,
    });

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'fetchImages',
      isLoading: true,
      isSuccess: false,
      isError: false,
      currentData: undefined,
      isFetching: true,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName: 'fetchImages',
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: mockImages,
      isFetching: false,
    });
  });
});
