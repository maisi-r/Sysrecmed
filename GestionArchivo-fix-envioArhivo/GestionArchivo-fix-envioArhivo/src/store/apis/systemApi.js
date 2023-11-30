import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const systemApi = createApi({

    reducerPath: 'systemApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://138.117.77.156:3007/api'
    }),

    endpoints: (builder) => ({

        getSystems: builder.query({
            query: () => '/system',
        }),
    })
});

export const { useGetSystemsQuery } = systemApi;