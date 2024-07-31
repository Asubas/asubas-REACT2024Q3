import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Page404 } from '../pages/404';

test('Renders the ModalBoundary', async () => {
  render(<Page404 />);
  const element = screen.getByText(/found/i);
  expect(element).toBeInTheDocument();
});
