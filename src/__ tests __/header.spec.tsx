import '@testing-library/jest-dom';
import { screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRedux } from '../tests/test-utils';
import { Header } from '../components/header/header';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockReturnValue(['/page1']),
}));

describe('Header', () => {
  it('should render the header with the correct elements', () => {
    const { element } = renderWithRedux(
      <MemoryRouter initialEntries={['/page1']}>
        <Header />
      </MemoryRouter>,
    );
    expect(element).toBeDefined();

    expect(screen.getByAltText('dog picture')).toBeInTheDocument();
    expect(screen.getByText('Cute dogs')).toBeInTheDocument();
    expect(screen.getByTestId('theme-button')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should navigate to /page0 when the logo is clicked', async () => {
    const mockNavigate = jest.fn();
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    const { element } = renderWithRedux(
      <MemoryRouter initialEntries={['/page0']}>
        <Header />
      </MemoryRouter>,
    );
    expect(element).toBeDefined();
    await act(async () => {
      fireEvent.click(screen.getByTestId('header-logo-button'));
    });
    expect(mockNavigate).toHaveBeenCalledWith('/page0');
  });

  it('should toggle the theme when the theme button is clicked', async () => {
    const { element, getByTestId } = renderWithRedux(
      <MemoryRouter initialEntries={['/page1']}>
        <Header />
      </MemoryRouter>,
    );

    expect(element).toBeDefined();
    await act(async () => {
      const themeButton = getByTestId('theme-button');
      fireEvent.click(themeButton);
    });

    expect(getByTestId('header')).toHaveClass('dark');
    await act(async () => {
      const themeButton = getByTestId('theme-button');
      fireEvent.click(themeButton);
    });
    expect(getByTestId('header')).not.toHaveClass('dark');
  });
});
