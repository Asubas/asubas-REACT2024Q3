import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/header/header';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the header section', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
  const element = screen.getByText(/Cute dogs/i);
  expect(true).toBeTruthy();
  expect(element).toBeInTheDocument();
});
