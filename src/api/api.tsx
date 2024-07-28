import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = 'live_5bmhXFI4Dr7CcadRA1NeYsdSgZpiGshkaDYlsQhjrnNnA2q2UfGDUdTOEI02WCHC';

export const apiDog = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thedogapi.com/v1/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('x-api-key', apiKey);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchBreeds: builder.query({
      query: () => 'breeds',
    }),
    fetchDetails: builder.query({
      query: (sub_id) => `images/${sub_id.sub_id}`,
    }),
    fetchImages: builder.query({
      query: ({ searchRequest = 0, page = 0 }) => {
        let url = `images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=ASC&page=${page}&limit=10`;
        if (searchRequest !== 0) {
          url += `&breed_ids=${searchRequest}`;
        }
        return url;
      },
    }),
  }),
});

export const {
  useFetchBreedsQuery,
  useFetchDetailsQuery,
  useFetchImagesQuery,
  useLazyFetchBreedsQuery,
  useLazyFetchDetailsQuery,
  useLazyFetchImagesQuery,
} = apiDog;
