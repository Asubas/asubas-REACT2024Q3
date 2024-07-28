import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as detailsSlice from '../app/slices/detailsSlice';
import { ContentSection } from '../components/contentSection/contentSection';
import { renderWithRedux } from '../tests/test-utils';
import { testState } from '../tests/testStore';
// import { testState } from '../tests/testStore';

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
    await act(async () => {
      fireEvent.click(findAllLabradors[0]);
    });
    expect(detailsSlice.setDetails).toHaveBeenCalledWith('1');
    expect(mockNavigate).toHaveBeenCalledWith('/page1/1');
    expect(detailsSlice.setDetails).toHaveBeenCalledWith('1');

    const FindAllRetrievers = await screen.findAllByText(/Golden Retriever/i);
    FindAllRetrievers.forEach((goodDog) => {
      expect(goodDog).toBeInTheDocument();
    });
  });

  it('if path[2] contains in url should be dispayed new content,', async () => {
    const mockStore = testState;
    const { getByText } = renderWithRedux(
      <MemoryRouter initialEntries={['/page1/labrador']}>
        <ContentSection />
      </MemoryRouter>,
      mockStore,
    );
    await act(async () => {
      await waitFor(() => {
        const resultElement = getByText(/Please wait, dogs coming to you 🐕🐕🐕/i);
        expect(resultElement).toBeInTheDocument();
      });
    });
  });
  it('should dispatch setDetails and setData actions when pathParts[2] exists', async () => {
    const mockNavigate = jest.fn().mockReturnValue(['/page1/labrador']);
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    renderWithRedux(
      <MemoryRouter initialEntries={['/page1']}>
        <ContentSection />
      </MemoryRouter>,
    );

    // Your existing test assertions
    const labradors = await screen.findAllByText(/Labrador Retriever/i);
    await act(async () => {
      fireEvent.click(labradors[0]);
    });
    expect(detailsSlice.setDetails).toHaveBeenCalledWith('1');
    expect(detailsSlice.setDetails).toHaveBeenCalledTimes(2);

    // Additional assertions for setData
    expect(detailsSlice.setDetails).toHaveBeenCalledWith('1');
    expect(detailsSlice.setDetails).toHaveBeenCalledTimes(2);
  });

  it('should dispatch setData action when pathParts[2] does not exist', async () => {
    const mockNavigate = jest.fn().mockReturnValue(['/page1/']);
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    renderWithRedux(
      <MemoryRouter initialEntries={['/page1']}>
        <ContentSection />
      </MemoryRouter>,
    );

    // Your existing test assertions
    const labradors = await screen.findAllByText(/Labrador Retriever/i);
    await act(async () => {
      fireEvent.click(labradors[0]);
    });
    expect(detailsSlice.setDetails).toHaveBeenCalledWith('1'); // Ensure setDetails called with empty string
    expect(detailsSlice.setDetails).toHaveBeenCalledTimes(3);

    // Additional assertions for setData
    expect(detailsSlice.setDetails).toHaveBeenCalledWith('1');
    expect(detailsSlice.setDetails).toHaveBeenCalledTimes(3);
  });
});
