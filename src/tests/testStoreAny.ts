import { IDogItem } from '../interfaces/dogInterface';

export const initialDogData: IDogItem[] = [
  {
    breeds: [
      {
        name: 'Labrador Retriever',
        height: {
          imperial: '22-24 inches',
          metric: '56-61 cm',
        },
        weight: {
          imperial: '65-80 lbs',
          metric: '29-36 kg',
        },
        bred_for: 'Guide dog, hunting, retrieving, family pet',
        life_span: '10-12 years',
        temperament: 'Friendly, outgoing, intelligent',
      },
    ],
    height: 500,
    width: 500,
    id: '1',
    url: 'https://example.com/dog1.jpg',
  },
  {
    breeds: [
      {
        name: 'Golden Retriever',
        height: {
          imperial: '21.5-24 inches',
          metric: '55-61 cm',
        },
        weight: {
          imperial: '65-75 lbs',
          metric: '29-34 kg',
        },
        bred_for: 'Hunting, retrieving, guide dog, family pet',
        life_span: '10-12 years',
        temperament: 'Intelligent, friendly, trustworthy',
      },
    ],
    height: 500,
    width: 500,
    id: '2',
    url: 'https://example.com/dog2.jpg',
  },
];
