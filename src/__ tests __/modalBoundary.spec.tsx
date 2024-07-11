import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ModalBoundary } from '../modalBoundary/modalBoundary';

test('Renders the ModalBoundary', async () => {
  render(<ModalBoundary />);
  const element = screen.getByText(/sorry/i);
  expect(element).toBeInTheDocument();
});
