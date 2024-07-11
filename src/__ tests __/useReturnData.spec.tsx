import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import * as services from '../api/requestApi';
import { useReturnData } from '../userHooks/useReturnData';
import { renderHook, waitFor } from '@testing-library/react';
jest.mock('../api/requestApi');

describe('useReturnData', () => {
  it('plz work', async () => {
    const mockFetchData = jest
      .spyOn(services, 'fetchData')
      .mockImplementation(async (page, urlPart) => [{ id: `item-${page}-${urlPart}` }]);

    const { result } = renderHook(() => useReturnData(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/page0/']}>{children}</MemoryRouter>
      ),
    });

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledTimes(1);
      expect(mockFetchData).toHaveBeenCalledWith(0, 0);
      expect(result.current).toEqual([{ id: 'item-0-0' }]);
    });
  });

  it('i dont know what i do', async () => {
    localStorage.setItem('resultSearch', '5');
    const mockFetchData = jest
      .spyOn(services, 'fetchData')
      .mockImplementation(async (page, urlPart) => [{ id: `item-${page}-${urlPart}` }]);

    const { result } = renderHook(() => useReturnData(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/page5/']}>{children}</MemoryRouter>
      ),
    });

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledTimes(2);
      expect(mockFetchData).toHaveBeenCalledWith(5);
      expect(result.current).toEqual([{ id: 'item-5-undefined' }]);
    });
  });
});
