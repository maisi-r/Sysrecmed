import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import urlApi from "../../constants/api";

export const authApi = createApi({

    reducerPath: 'authApi',
    
    baseQuery: fetchBaseQuery({ baseUrl: urlApi}),
    tagTypes: ['Register'],
    endpoints: (builder) => ({  

        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        register: builder.mutation({
            query: (credentials) => ({
                url: 'auth/register',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Register', id: arg.id }],
        }),
    }),
})
export const { useLoginMutation, useRegisterMutation } = authApi;