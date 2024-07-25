import { QueryStatus } from '@reduxjs/toolkit/query';
import { apiDog } from '../api/api';
import { IDogItem } from '../interfaces/dogInterface';
import { RootState } from '../app/store';

const initialDogData: IDogItem[] = [
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

export const testState: Partial<RootState> = {
  data: {
    initialData: initialDogData,
  },
  pagination: {
    isPagination: false,
  },
  details: {
    initialData: 'Labrador',
  },
  favorite: {
    initFavoriteArr: initialDogData,
  },
  reset: {
    isReset: false,
  },
  searchResult: {
    isResult: true,
  },
  [apiDog.reducerPath]: {
    queries: {
      fetchBreeds: {
        data: [
          { id: 1, name: 'Labrador Retriever' },
          { id: 2, name: 'Golden Retriever' },
        ],
        status: QueryStatus.fulfilled,
        error: undefined,
        originalArgs: undefined,
        requestId: 'fetchBreeds',
        endpointName: 'fetchBreeds',
        startedTimeStamp: 0,
        fulfilledTimeStamp: 0,
      },
      fetchDetails: {
        data: {
          id: '1',
          url: 'https://example.com/dog1.jpg',
          breeds: [
            {
              name: 'Labrador Retriever',
              height: { imperial: '22-24 inches', metric: '56-61 cm' },
              weight: { imperial: '65-80 lbs', metric: '29-36 kg' },
              bred_for: 'Guide dog, hunting, retrieving, family pet',
              life_span: '10-12 years',
              temperament: 'Friendly, outgoing, intelligent',
            },
          ],
        },
        status: QueryStatus.fulfilled,
        error: undefined,
        originalArgs: { sub_id: '1' },
        requestId: 'fetchDetails',
        endpointName: 'fetchDetails',
        startedTimeStamp: 0,
        fulfilledTimeStamp: 0,
      },
      fetchImages: {
        data: [
          {
            id: '1',
            url: 'https://example.com/dog1.jpg',
            breeds: [
              {
                name: 'Labrador Retriever',
                height: { imperial: '22-24 inches', metric: '56-61 cm' },
                weight: { imperial: '65-80 lbs', metric: '29-36 kg' },
                bred_for: 'Guide dog, hunting, retrieving, family pet',
                life_span: '10-12 years',
                temperament: 'Friendly, outgoing, intelligent',
              },
            ],
          },
          {
            id: '2',
            url: 'https://example.com/dog2.jpg',
            breeds: [
              {
                name: 'Golden Retriever',
                height: { imperial: '21.5-24 inches', metric: '55-61 cm' },
                weight: { imperial: '65-75 lbs', metric: '29-34 kg' },
                bred_for: 'Hunting, retrieving, guide dog, family pet',
                life_span: '10-12 years',
                temperament: 'Intelligent, friendly, trustworthy',
              },
            ],
          },
        ],
        status: QueryStatus.fulfilled,
        error: undefined,
        originalArgs: { searchRequest: 0, page: 0 },
        requestId: 'fetchImages',
        endpointName: 'fetchImages',
        startedTimeStamp: 0,
        fulfilledTimeStamp: 0,
      },
    },
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      reducerPath: apiDog.reducerPath,
      online: true,
      focused: false,
      middlewareRegistered: true,
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false,
      keepUnusedDataFor: 60,
      invalidationBehavior: 'delayed',
    },
  },
};
