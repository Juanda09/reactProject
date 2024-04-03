import { configureStore } from '@reduxjs/toolkit';
import numberReducer from './features/numberSlice';
import usersReducer from './features/userSlice';
import authReducer from './features/authSlice';
import { apiSlice } from './features/api/apiSlice';
import { apiHouseSlice } from './features/api/apiHouseSlice';
import { apiMessageSlice } from './features/api/apiMessageSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [apiHouseSlice.reducerPath]: apiHouseSlice.reducer,
        [apiMessageSlice.reducerPath]: apiMessageSlice.reducer,
        number: numberReducer,
        users: usersReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, apiHouseSlice.middleware,apiMessageSlice.middleware), // Agrega el middleware de apiHouseSlice aquí
})

export default store;
