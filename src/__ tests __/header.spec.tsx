import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/header/header';

test('Renders the header section', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
  const imageElement = screen.getByAltText('dog picture');
  await user.click(imageElement);
  expect(localStorage.getItem('resultSearch')).toBeNull();
  expect(localStorage.getItem('textSearch')).toBeNull();
});
