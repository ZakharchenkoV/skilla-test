import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.skilla.ru',
    prepareHeaders: (headers) => {
      headers.set('Authorization', 'Bearer testtoken');

      return headers;
    },
  }),
  endpoints: () => ({}),
});
