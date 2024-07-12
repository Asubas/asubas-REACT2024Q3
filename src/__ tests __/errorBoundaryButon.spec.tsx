import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ErrorBoundaryButton } from '../components/errorBoundary/errorBoundaryButton';

test('testErrorBoundary', async () => {
  render(<ErrorBoundaryButton />);
  const element = screen.getByText(/Boundary/i);
  expect(element).toBeInTheDocument();
});
