import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiMessageSlice = createApi({
    reducerPath: "apiMessage",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: () => `/message`,
        }),
        createMessage: builder.mutation({
            query: (newMessage) => ({
                url: `/message`,
                method: 'POST',
                body: newMessage,
            }),
        }),
    }),

});
export const {
    useGetMessagesQuery,
    useCreateMessageMutation,
} = apiMessageSlice;