import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRedux } from '../tests/test-utils';
import { Pagination } from '../components/pagination/pagination';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockReturnValue(['/page1']),
}));

describe('Pagination', () => {
  it('should render pagination buttons and navigate to correct page on click', async () => {
    const mockNavigate = jest.fn();
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    const { element } = renderWithRedux(
      <MemoryRouter initialEntries={['/page1']}>
        <Pagination />
      </MemoryRouter>,
    );

    expect(element).toBeDefined();
    const buttons = screen.getAllByRole('button', { name: /[0-9]+/ });
    expect(buttons).toHaveLength(10);
    await act(async () => {
      fireEvent.click(buttons[1]);
    });
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });
    expect(buttons[1]).toHaveClass('active');
  });

  it('should navigate to the previous page when clicking the prev button', async () => {
    const mockNavigate = jest.fn();
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    renderWithRedux(
      <MemoryRouter initialEntries={['/page2']}>
        <Pagination />
      </MemoryRouter>,
    );

    const prevButton = screen.getByText('-');
    await act(async () => {
      fireEvent.click(prevButton);
    });
    await waitFor(() => {
      expect(screen.getByText('1')).toHaveClass('active');
    });
  });

  it('should navigate to the next page when clicking the next button', async () => {
    const mockNavigate = jest.fn();
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    renderWithRedux(
      <MemoryRouter initialEntries={['/page1']}>
        <Pagination />
      </MemoryRouter>,
    );

    const nextButton = screen.getByText('+');
    await act(async () => {
      fireEvent.click(nextButton);
    });
    await waitFor(() => {
      expect(screen.getByText('2')).toHaveClass('active');
    });
  });

  it('should not navigate to previous page if current page is 0', async () => {
    const mockNavigate = jest.fn();
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    renderWithRedux(
      <MemoryRouter initialEntries={['/page0']}>
        <Pagination />
      </MemoryRouter>,
    );

    const prevButton = screen.getByText('-');
    await act(async () => {
      fireEvent.click(prevButton);
    });

    await waitFor(() => {
      expect(screen.getByText('0')).toHaveClass('active');
    });
  });

  it('should not navigate to next page if current page is the last page', async () => {
    const mockNavigate = jest.fn();
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    renderWithRedux(
      <MemoryRouter initialEntries={['/page9']}>
        <Pagination />
      </MemoryRouter>,
    );

    const nextButton = screen.getByText('+');
    await act(async () => {
      fireEvent.click(nextButton);
    });
    await waitFor(() => {
      expect(screen.getByText('9')).toHaveClass('active');
    });
  });
});
