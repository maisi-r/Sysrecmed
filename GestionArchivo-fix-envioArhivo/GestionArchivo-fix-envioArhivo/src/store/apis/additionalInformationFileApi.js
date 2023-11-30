import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const addtionalInformationFileApi = createApi({

    reducerPath: 'addtionalInformationFileApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://138.117.77.156:3007/api'
    }),


    tagTypes: ["Additional"],

    endpoints: (builder) => ({

        getAdditionalInformationFile: builder.query({
            query: (id) => `/additional-information-file/${id}`,
            providesTags: ["Additional"]

        }),

        getAdditionalInformationFiles: builder.query({
            query: () => '/additional-information-file',
            providesTags: ["Additional"]
        }),

        addAditionaInformationFile: builder.mutation({
            query: ({id, data}) => ({
                url: `/additional-information-file/${id}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Additional"]
        }),

        updateAditionaInformationFile: builder.mutation({
             query: ({ id, data }) => ({
                 url: `/additional-information-file/${id}`,
                 method: 'PUT',
                 body: data
             }),
             invalidatesTags: ["Additional"]
        }), 

        deleteAditionaInformationFile: builder.mutation({
            query: (id) => ({
                url: `/additional-information-file/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Additional"]
        })
    })
});


export const { useGetAdditionalInformationFileQuery, useAddAditionaInformationFileMutation, useUpdateAditionaInformationFileMutation, useDeleteAditionaInformationFileMutation  } = addtionalInformationFileApi;