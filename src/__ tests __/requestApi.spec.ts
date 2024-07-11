import '@testing-library/jest-dom';
import * as services from '../api/requestApi';

test('requestApi', async () => {
  const mockFetchData = jest.spyOn(services, 'fetchData').mockImplementation(async () => {
    return [
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
  });
  mockFetchData.mockRestore();
});
