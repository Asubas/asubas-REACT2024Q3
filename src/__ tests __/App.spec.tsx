import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
// import { App } from '../App';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/header/header';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
  expect(true).toBeTruthy();
});
