import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { App } from '../App';
import { MemoryRouter } from 'react-router-dom';

test('Renders the footer section', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const element = screen.getByText(/cute dogs/i);
  expect(element).toBeInTheDocument();
});
