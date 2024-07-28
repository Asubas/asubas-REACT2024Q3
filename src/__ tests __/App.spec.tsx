import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { App } from '../App';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../app/store';

test('Renders the App section', () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>,
  );
  const element = screen.getByText(/cute dogs/i);
  expect(element).toBeInTheDocument();
});
