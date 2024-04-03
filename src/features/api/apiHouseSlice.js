import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiHouseSlice = createApi({
    reducerPath: "apiHouse",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }), // Hace las veces de Axios
    endpoints: (builder) => ({
        getHouses: builder.query({
            query: () => '/house',
            providesTags: ['Houses'],
        }),
        getHouseByCodigo: builder.query({
            query: (codigo) => `/house/${codigo}`,
            providesTags: ['Houses']
        }),
        updateHouseByCodigo: builder.mutation({
            query: ({ codigo, ...updates }) => ({
                url: `/house/${codigo}`,
                method: 'PATCH',
                body: updates
            }),
            invalidatesTags: ['Houses']
        }),
        createHouse: builder.mutation({
            query: (newHouse) => ({
                url: '/house',
                method: 'POST',
                body: newHouse
            }),
            invalidatesTags: ['Houses']
        }),
        deleteHouseByCodigo: builder.mutation({
            query: (codigo) => ({
                url: `/house/${codigo}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Houses']
        }),
        uploadImage: builder.mutation({
            query: (body) => ({
                url: `/upload/${body.codigo}/house`,
                method: "POST",
                body: body.file
            }),
            invalidatesTags: ["Houses"]
        }),
    })
});

export const {
    useGetHousesQuery,
    useGetHouseByCodigoQuery,
    useUpdateHouseByCodigoMutation,
    useCreateHouseMutation,
    useDeleteHouseByCodigoMutation,
    useUploadImageMutation
} = apiHouseSlice;