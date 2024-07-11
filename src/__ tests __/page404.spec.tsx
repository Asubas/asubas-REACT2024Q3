import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Page404 } from '../components/page404/page404';

test('Renders the ModalBoundary', async () => {
  render(<Page404 />);
  const element = screen.getByText(/found/i);
  expect(element).toBeInTheDocument();
});
