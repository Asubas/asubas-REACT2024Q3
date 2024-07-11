import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { SearchForm } from '../components/searchForm/searchForm';
import { MemoryRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import { ContentSection } from '../components/contentSection/contentSection';
import { IDogItem } from '../interfaces/dogInterface';

test('SearchForm', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>,
  );
  await user.click(screen.getByRole('button', { name: /search/i }));
});

function setup(tsx: ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(tsx),
  };
}
const testDog: IDogItem[] = [
  {
    breeds: [
      {
        name: 'Akita',
        height: {
          imperial: '',
          metric: '',
        },
        weight: {
          imperial: '',
          metric: '',
        },
        bred_for: '',
        life_span: '',
        temperament: '',
      },
    ],
    height: 1,
    width: 1,
    id: '',
    url: '',
  },
];
test('render with a setup function', async () => {
  const { getByText } = setup(
    <MemoryRouter>
      <ContentSection data={testDog} />
    </MemoryRouter>,
  );

  expect(getByText('Akita')).toBeInTheDocument();
  expect(getByText('1')).toBeInTheDocument();
});
