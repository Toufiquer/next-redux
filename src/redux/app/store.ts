/*
|-----------------------------------------
| setting up Store for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/
// This template is only for use redux store.

import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './../features/api/apiSlice';
import usersSlice from './../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: usersSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
