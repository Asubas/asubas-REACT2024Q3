import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from '../components/footer/footer';

test('Renders the footer section', () => {
  render(<Footer />);
  const element = screen.getByText(/Asubas/i);
  expect(element).toBeInTheDocument();
});
