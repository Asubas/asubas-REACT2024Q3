import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/errorBoundary/errorBoundary';

describe('ErrorBoundary', () => {
  const ThrowError = () => {
    throw new Error('Test');
  };

  const realError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });
  afterEach(() => {
    console.error = realError;
  });

  it('renders children when everything is fine', async () => {
    render(
      <ErrorBoundary>
        <h2>
          Oops! Looks like something went wrong! Want to see details or try reloading the page?
        </h2>
      </ErrorBoundary>,
    );
  });

  it('shows an apologetic error message when an unhandled exception is thrown', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
        <h2>
          Oops! Looks like something went wrong! Want to see details or try reloading the page?
        </h2>
      </ErrorBoundary>,
    );

    expect(screen.queryByText(/sorry/i)).not.toBeInTheDocument();
    expect(screen.getByText(/something/i)).toBeInTheDocument();
  });
});
