import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fileApi = createApi({

    reducerPath: 'fileApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://138.117.77.156:3007/api'
    }),

    tagTypes: ["File"],

    endpoints: (builder) => ({

        getFile: builder.query({
            query: (id) => `/file/${id}`, 
            providesTags: ["File"]
        }),

        getFiles: builder.query({
            query: () => '/file/?size=100', 
            providesTags: ["File"]
        }),

        addFile: builder.mutation({
            query: (data) => ({
                url: '/file',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["File"]
        }),

        updateFile: builder.mutation({
             query: ({ id, data }) => ({
                 url: `/file/${id}`,
                 method: 'PUT',
                 body: data
             }),
             invalidatesTags: ["File"]
        }),

        deleteFile: builder.mutation({
            query: (id) => ({
                url: `/file/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["File"]
        }),
        
    })
});

export const { useGetFilesQuery, useAddFileMutation, useUpdateFileMutation, useDeleteFileMutation, useGetFileQuery } = fileApi;