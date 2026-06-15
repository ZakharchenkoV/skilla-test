import { baseApi } from '@/shared';

import type {
  GetCallsParams,
  GetRecordParams,
  ICallsResponse,
} from '../model/types';

export const callsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.query<ICallsResponse, GetCallsParams>({
      query: (params) => ({
        url: '/mango/getList',
        method: 'POST',
        body: params,
      }),
    }),
    getRecord: builder.mutation<Blob, GetRecordParams>({
      query: ({ record, partnershipId }) => ({
        url: '/mango/getRecord',
        method: 'POST',
        params: {
          record,
          partnership_id: partnershipId,
        },
        // responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const { useGetCallsQuery, useGetRecordMutation } = callsApi;
