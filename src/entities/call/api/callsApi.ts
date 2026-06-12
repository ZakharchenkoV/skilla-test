import { baseApi } from '../../../shared';
import type { GetCallsParams, ICallsResponse } from '../model/types';

export const callsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.query<ICallsResponse, GetCallsParams>({
      query: (params) => ({
        url: '/mango/getList',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useGetCallsQuery } = callsApi;
