import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import urlApi from '../../constants/api';

export const userApi = createApi({

    reducerPath: 'userApi',

    baseQuery: fetchBaseQuery({
        baseUrl: urlApi
    }),
    // refetchOnFocus: true,
    // refetchOnMountOrArgChange: true,
    tagTypes: ["User"],
    endpoints: (builder) => ({

        getUsers: builder.query({
            query: () => '/user',
            providesTags: ["User"]
        }),

        getUser: builder.query({
            query: (id) => `/user/${id}`,
            providesTags: ["User"]
        }),

        addUser: builder.mutation({
            query: (data) => ({
                url: '/user',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["User"]
        }),

        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/user/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ["User"]
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["User"]
        })
    })
});


export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation, useGetUserQuery  } = userApi;