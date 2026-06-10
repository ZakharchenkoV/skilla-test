import { baseApi } from '../../../shared';

export const callsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.query({
      query: (params) => ({
        url: '/mango/getList',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useGetCallsQuery } = callsApi;
